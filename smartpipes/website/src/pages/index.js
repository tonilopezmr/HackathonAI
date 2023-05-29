
import { Inter } from 'next/font/google'
import Head from 'next/head'
import SmartPipeList from '@/components/SmartPipesList'
import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';

export default function Home() {
  const [smartPipes, setSmartPipes] = useState([])
  const [socket, setSocket] = useState(null);
  const [currentSmartPipe, setCurrentSmartPipe] = useState(undefined);
  const [currentRequest, setCurrentRequest] = useState(undefined);

  useEffect(() => {
    const newSocket = socketio.connect('http://localhost:1337');
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  const handleMessageSubmit = event => {
    event.preventDefault();
    const message = event.target.message.value;
    console.log(`Sending message to server: ${message}`);
    socket.emit('message', message);
    event.target.reset();
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('message', message => {
      console.log(`Received message from server:`, message);
      if(message.type === 'smart_pipes') {
        setSmartPipes(message.payload)        
        if(currentSmartPipe !== undefined) {          
          message.payload.forEach(sp => {
            if(sp.id === currentSmartPipe.id) {
              setCurrentSmartPipe(sp)              
            }
          })          
        }
      } else if (message.type === 'add_request') {
        setCurrentRequest(message.payload)
      } else if (message.type === 'update_request') {
        setCurrentRequest(message.payload)
      }
    });
  }, [socket, currentSmartPipe]);

  return (
    <>   
    <Head>
        <title>SmartPipes - Seaplane</title>
    </Head>
      <div className="min-h-full">                                   
        <SmartPipeList smartPipes={smartPipes} currentSmartPipe={currentSmartPipe} setCurrentSmartPipe={setCurrentSmartPipe} currentRequest={currentRequest}/>
      </div>
    </>
  )
}
