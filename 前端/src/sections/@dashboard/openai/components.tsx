import { Card } from '@mui/material';

type Props = {
  text: string;
  sendType: 'send' | 'receive';
};

export const ChatCard: React.FC<Props> = ({ text, sendType }) => {
  return (
    <div
      style={{
        width: 'inherit',
        display: 'flex',
        justifyContent: sendType === 'send' ? 'flex-end' : 'initial',
        padding: '20px',
      }}
    >
      <Card
        sx={{
          p: 3,
          width: 'auto',
          height: '100%',
          backgroundColor: sendType === 'send' ? '#f0fff0' : '#fff',
          alignSelf: 'flex-end',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          // textAlign: sendType === 'send' ? 'right' : 'left',
        }}
      >
        {text}
      </Card>
    </div>
  );
};
