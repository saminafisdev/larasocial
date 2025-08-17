// import React, { useEffect, useState, useRef } from 'react';
// import { Inertia } from '@inertiajs/inertia';

// import Echo from 'laravel-echo';
// window.Pusher = require('pusher-js');

// export default function ChatShow({ chat, otherUser, messages, authUserId }) {
//   const [chatMessages, setChatMessages] = useState(messages);
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     // Scroll to bottom on load and new message
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chatMessages]);

//   useEffect(() => {
//     if (!chat) return;

//     // Setup Echo listener
//     window.Echo = new Echo({
//       broadcaster: 'pusher',
//       key: import.meta.env.VITE_PUSHER_APP_KEY,
//       cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//       forceTLS: true,
//       encrypted: true,
//     });

//     const channel = window.Echo.private(`chat.${chat.id}`);

//     channel.listen('MessageSent', (e) => {
//       setChatMessages(prev => [...prev, e.message]);
//     });

//     return () => {
//       channel.stopListening('MessageSent');
//     };
//   }, [chat]);

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (newMessage.trim() === '') return;

//     Inertia.post(`/chat/${otherUser.username}/message`, { message: newMessage }, {
//       onSuccess: () => setNewMessage(''),
//     });
//   };

//   if (!chat) {
//     return (
//       <div>
//         <h2>Start conversation with {otherUser.name}</h2>
//         <form onSubmit={handleSend}>
//           <textarea
//             value={newMessage}
//             onChange={e => setNewMessage(e.target.value)}
//             placeholder="Write your message..."
//           />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-full p-4">
//       <h2 className="font-bold mb-2">Chat with {otherUser.name}</h2>
//       <div className="flex-grow overflow-auto border p-2 mb-2">
//         {chatMessages.map(msg => (
//           <div
//             key={msg.id}
//             className={`p-2 my-1 rounded ${msg.profile.user.id === authUserId ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}
//           >
//             <div className="text-sm font-semibold">{msg.profile.user.name}</div>
//             <div>{msg.message_text}</div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <form onSubmit={handleSend} className="flex">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={e => setNewMessage(e.target.value)}
//           placeholder="Write your message"
//           className="flex-grow border rounded px-2"
//         />
//         <button type="submit" className="ml-2 bg-blue-500 text-white px-4 rounded">Send</button>
//       </form>
//     </div>
//   );
// }
