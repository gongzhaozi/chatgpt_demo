import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Card, Container, Stack } from '@mui/material';
// redux
import { store, useDispatch, useSelector } from '../../../redux/store';
import {
  getContacts,
  getConversation,
  getParticipants,
  getConversations,
  addRecipients,
  sendMessage,
  markConversationAsRead,
  resetActiveConversation,
} from '../../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
// @types
import { IChatParticipant, IChatSendMessage } from '../../../@types/chat';
// sections
import ChatNav from './nav/ChatNav';
import ChatRoom from './room/ChatRoom';
import ChatMessageInput from './message/ChatMessageInput';
import ChatMessageList from './message/ChatMessageList';
import ChatHeaderDetail from './header/ChatHeaderDetail';
import ChatHeaderCompose from './header/ChatHeaderCompose';

// ----------------------------------------------------------------------

const CURRENT_USER_ID = '8864c717-587d-472a-929a-8e5f298024da-0';

export default function Chat() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { conversationKey = '' } = useParams();

  const { contacts, recipients, participants, activeConversationId, conversations } = useSelector(
    (state) => state.chat
  );

  const selectedConversation = useSelector(() => {
    if (activeConversationId) {
      return conversations.byId[activeConversationId];
    }

    return {
      id: '',
      messages: [],
      participants: [],
      unreadCount: 0,
      type: '',
    };
  });

  const detailView = !!conversationKey;

  const displayParticipants = participants.filter((item) => item.id !== CURRENT_USER_ID);

  useEffect(() => {
    dispatch(getConversations(CURRENT_USER_ID));
    dispatch(getContacts(CURRENT_USER_ID));
  }, [dispatch]);

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(CURRENT_USER_ID, `${conversationKey}`));
      try {
        await dispatch(getConversation(CURRENT_USER_ID, `${conversationKey}`));
      } catch (error) {
        console.error(error);
        navigate(PATH_DASHBOARD.chat.new);
      }
    };

    if (conversationKey) {
      getDetails();
    } else if (activeConversationId) {
      dispatch(resetActiveConversation());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationKey]);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationAsRead(activeConversationId));
    }
  }, [dispatch, activeConversationId]);

  const handleAddRecipients = (selectedRecipients: IChatParticipant[]) => {
    dispatch(addRecipients(selectedRecipients));
  };

  const handleSendMessage = async (value: IChatSendMessage) => {
    try {
      dispatch(sendMessage(value));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Card sx={{ height: '82vh', display: 'flex' }}>
        <ChatNav conversations={conversations} activeConversationId={activeConversationId} />

        <Stack flexGrow={1} sx={{ overflow: 'hidden' }}>
          {detailView ? (
            <ChatHeaderDetail participants={displayParticipants} />
          ) : (
            <ChatHeaderCompose
              recipients={recipients}
              contacts={Object.values(contacts.byId)}
              onAddRecipients={handleAddRecipients}
            />
          )}
          <Stack
            direction="row"
            flexGrow={1}
            sx={{
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {/* 聊天输入框 */}
            <Stack flexGrow={1} sx={{ minWidth: 0 }}>
              <ChatMessageList conversation={selectedConversation} />

              <ChatMessageInput
                conversationId={activeConversationId}
                onSend={handleSendMessage}
                disabled={
                  pathname === PATH_DASHBOARD.chat.root || pathname === PATH_DASHBOARD.chat.new
                }
              />
            </Stack>

            {detailView && (
              <ChatRoom conversation={selectedConversation} participants={displayParticipants} />
            )}
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
