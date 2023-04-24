import { v4 as uuidv4 } from 'uuid';
import { sub } from 'date-fns';
import { dotCase } from 'change-case';
import { sample, isEmpty, xor } from 'lodash';
// config
import { HOST_API } from '../../config';
// _mock
import _mock from './_mock';
// import { _files } from './_files';

// ----------------------------------------------------------------------

export const MY_CONTACT = {
  id: '8864c717-587d-472a-929a-8e5f298024da-0',
  avatar: `${HOST_API}/assets/images/avatars/avatar_1.jpg`,
  name: 'Jaydon Frankie',
  username: 'jaydon.frankie',
};

// ----------------------------------------------------------------------

export const contacts = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  username: _mock.name.fullName(index) && dotCase(_mock.name.fullName(index)),
  avatar: _mock.image.avatar(index),
  address: _mock.address.fullAddress(index),
  phone: _mock.phoneNumber(index),
  email: _mock.email(index),
  lastActivity: _mock.time(index),
  status: sample(['online', 'offline', 'away', 'busy']) || 'online',
  role: _mock.role(index),
}));

export const conversations = [
  {
    id: _mock.id(1),
    participants: [MY_CONTACT, contacts[1]],
    type: 'ONE_TO_ONE',
    unreadCount: 1,
    messages: [
      {
        id: uuidv4(),
        body: _mock.text.sentence(1),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 10 }),
        senderId: contacts[1].id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(2),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 2 }),
        senderId: MY_CONTACT.id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(3),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 8 }),
        senderId: contacts[1].id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(4),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 6 }),
        senderId: MY_CONTACT.id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(5),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 4 }),
        senderId: contacts[1].id,
      },
      {
        id: uuidv4(),
        contentType: 'text',
        attachments: [],
        body: _mock.text.sentence(6),
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: MY_CONTACT.id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(7),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: MY_CONTACT.id,
      },
    ],
  },
  {
    id: _mock.id(3),
    participants: [MY_CONTACT, contacts[2]],
    type: 'ONE_TO_ONE',
    unreadCount: 1,
    messages: [
      {
        id: uuidv4(),
        body: _mock.text.sentence(1),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 10 }),
        senderId: contacts[2].id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(2),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 2 }),
        senderId: MY_CONTACT.id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(3),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 8 }),
        senderId: contacts[2].id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(4),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 6 }),
        senderId: MY_CONTACT.id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(5),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 4 }),
        senderId: contacts[2].id,
      },
      {
        id: uuidv4(),
        contentType: 'text',
        attachments: [],
        body: _mock.text.sentence(6),
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: MY_CONTACT.id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(7),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: MY_CONTACT.id,
      },
    ],
  },
  {
    id: _mock.id(11),
    participants: [MY_CONTACT, contacts[1], contacts[2]],
    type: 'GROUP',
    unreadCount: 0,
    messages: [
      {
        id: uuidv4(),
        body: _mock.text.sentence(6),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 30 }),
        senderId: MY_CONTACT.id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(7),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 29 }),
        senderId: contacts[1].id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(8),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 28 }),
        senderId: contacts[1].id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(9),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 27 }),
        senderId: contacts[2].id,
      },
      {
        id: uuidv4(),
        attachments: [],
        body: _mock.text.sentence(10),
        contentType: 'text',
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 26 }),
        senderId: MY_CONTACT.id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(11),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3 }),
        senderId: contacts[2].id,
      },
      {
        id: uuidv4(),
        body: _mock.text.sentence(12),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3 }),
        senderId: contacts[1].id,
      },
    ],
  },
];

// ----------------------------------------------------------------------

export const findContactByUsername = (username: string) => {
  const contact = contacts.find((_contact) => _contact.username === username);
  return contact || null;
};

export const findConversationById = (conversationId: string) => {
  const conversation = conversations.find((_conversation) => _conversation.id === conversationId);
  return conversation || null;
};

export const findConversationByOtherParticipantId = (participantId: string) => {
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

export const findConversationByParticipantIds = (participantIds: string[]) => {
  const conversation = conversations.find((_conversation) => {
    if (_conversation.participants.length < participantIds.length) {
      return false;
    }
    const _participantIds: string[] = [];
    _conversation.participants.forEach((_participant) => {
      _participantIds.push(_participant.id);
    });

    return isEmpty(xor(participantIds, _participantIds));
  });
  return conversation || null;
};
