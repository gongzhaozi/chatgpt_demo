import { sqlQuery } from '../../lib/db';
import { IChatConversation, IChatMessage, IChatParticipant, IChatContact } from './@type/chat';
import { RowDataPacket } from 'mysql2';

// export async function getUserInfoById(UId: string) {
//   try {
//     const query =
//       'select id,displayName as name,username,photoURL as avatar,address,phoneNumber as phone,email,lastActivity,status from users where id = ?';
//     const valuesParams = [UId];
//     const results = await sqlQuery(query, valuesParams);
//     return { ...results };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function getUserInfoByName(Name: string) {
//   try {
//     const query =
//       'select id,displayName as name,username,photoURL as avatar,address,phoneNumber as phone,email,lastActivity,status from users where displayName = ?';
//     const valuesParams = [Name];
//     const results = await sqlQuery(query, valuesParams);
//     return { ...results };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function findConversationByIds(send: IChatParticipant, receive: IChatParticipant) {
//   try {
//     const query = `select id,message as body,type as contentType,attachments,create_date as createdAt,sender_id as senderId from message WHERE (sender_id in (?, ?) ) and (receive_id in (?, ?)) and is_deleted = 0`;
//     const valuesParams = [send.id, receive.id, send.id, receive.id];
//     const conversationResults = await sqlQuery(query, valuesParams);
//     const messages: IChatMessage[] = Object.values(conversationResults) as IChatMessage[];
//     const ReceiveId = receive.id;
//     const participants = [send, receive];

//     const Conversation: IChatConversation = {
//       id: ReceiveId,
//       participants: participants,
//       type: 'ONE_TO_ONE',
//       unreadCount: 1,
//       messages: messages,
//     };
//     return { Conversation };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function findContactByName(Name: string) {
//   try {
//     const query =
//       'select * from chatgpt.message WHERE (sender_id = ? and receive_id = ?) or (receive_id = ? and sender_id =?)and is_deleted = 0';
//     const valuesParams = [Name];
//     const contacts = await sqlQuery(query, valuesParams);
//     return { ...contacts };
//   } catch (error) {
//     return { error };
//   }
// }

// conversations
export async function getConversationsById(UserID: string) {
  try {
    // 根据UserID，获得conversation表里的值
    const query = `
    SELECT conver_id as id,participant_id as participantsIds,conver_type as type,unread_count-> ? as unreadCount 
    FROM conversation 
    where participant_id like ?`;
    const valuesParams = [`$."${UserID}"`, `%${UserID}%`];

    const conversations: IChatConversation[] = (await sqlQuery(
      query,
      valuesParams
    )) as IChatConversation[];

    // 根据participantsIds获得对应的人并赋值
    const participantIds: string[] = [];

    conversations.forEach((conversation, conver_index) => {
      if (conversation.participantsIds)
        conversation.participantsIds.split(',').forEach((participantsId, index) => {
          if (!participantIds.includes(participantsId)) participantIds.push(participantsId);
        });
    });

    const participants: IChatParticipant[] = (await getUserInfoByIds(
      participantIds
    )) as IChatParticipant[];

    // 根据conversation的ID，获得关联的Message值，并赋值给conversation
    const conversationIds = conversations.map((conversation) => conversation.id);
    const messages: IChatMessage[] = (await getMessageByIds(conversationIds)) as IChatMessage[];

    conversations.forEach((conversation, conver_index) => {
      conversation.messages = [];
      conversation.participants = [];
      // 导入对话
      messages.forEach((message, message_index) => {
        if (message.converId === conversation.id) {
          conversation.messages.push(message);
        }
      });
      // 导入参与者
      if (conversation.participantsIds)
        conversation.participantsIds.split(',').forEach((participantsId, index) => {
          conversation.participants.push(
            participants.find((item) => item.id === participantsId) as IChatParticipant
          );
        });
    });
    return conversations;
  } catch (error) {
    return { error };
  }
}

async function getMessageByIds(converIds: string[]) {
  try {
    const query = `
    SELECT conver_id as converId, message_uuid as id,content as body, content_type as contentType, create_time as createdAt,send_id as senderId  
    FROM message 
    WHERE conver_id in (${converIds.map(() => '?').join(',')})`;
    const valuesParams = converIds;
    const results = await sqlQuery(query, valuesParams);
    return results;
  } catch (error) {
    return { error };
  }
}

export async function getUserInfoByIds(UserIdS: string[]) {
  try {
    const query = `
    SELECT user_id as id, display_name as name,username, photo_url as avatar, address,phone,email,last_active as lastActivity, status,role 
    FROM user 
    WHERE user_id in (${UserIdS.map(() => '?').join(',')})`;
    const valuesParams = UserIdS;
    const results = await sqlQuery(query, valuesParams);
    return results;
  } catch (error) {
    return { error };
  }
}

// contacts
export async function getContactsById(UserId: string) {
  try {
    const contactList = (await getContactsIdsById(UserId)) as RowDataPacket[];
    const contactListIds = contactList.map((item) => item.user_id);
    const participants: IChatContact[] = (await getUserInfoByIds(contactListIds)) as IChatContact[];
    return participants;
  } catch (error) {
    return { error };
  }
}

async function getContactsIdsById(UserId: string) {
  try {
    const query = `
    SELECT DISTINCT IF(user_id1=A.id, user_id2, user_id1) AS user_id
    FROM contact 
    INNER JOIN (SELECT ? as id) AS A ON user_id1=A.id OR user_id2=A.id
    WHERE user_id1=A.id OR user_id2=A.id;`;
    const valuesParams = [UserId];
    const results = await sqlQuery(query, valuesParams);
    return results;
  } catch (error) {
    return { error };
  }
}

// conversation
export const findConversationFromConversationsById = (
  participantId: string,
  conversations: IChatConversation[]
) => {
  const conversation = conversations.find((_conversation) => {
    if (_conversation.type !== 'ONE_TO_ONE') {
      return false;
    }
    const participant = _conversation.participants.find(
      (_participant) => _participant.id === participantId
    );
    return !!participant;
  });
  return conversation || null;
};
