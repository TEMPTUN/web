import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
  LoadingIndicator,
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';

const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const App = () => {
    const [client, setClient] = useState(null);
    const[channel,setChannel]=useState(null);
    const user = {
        id: 'dave-matthews',
        name: 'Dave Matthews',
        image: 'https://getstream.io/random_svg/?id=dave-matthews&name=Dave+Matthews',
    };

    useEffect(() => {
        async function init() {
            const client = StreamChat.getInstance('yjrbhj6xcy5s');
            await client.connectUser(user,client.devToken(user.id));
            setClient(client);

            const ch = client.channel('messaging', 'godevs', { 
                name: 'Talk about Go',
                image: 'https://getstream.io/random_svg/?id=godevs&name=Talk+about+Go',
                members: [user.id],
            });

            await ch.watch();
            setChannel(ch);
            setClient(client);
        }
        init()
        if(client) return () => client.disconnect();
    }, []);

    if(!channel || !client) return <LoadingIndicator/>;

    return (
        <Chat client={client} theme="messaging light">
            <ChannelList filters={filters} sort={sort} options={options} />
            <Channel channel={channel}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    );
};

export default App;
