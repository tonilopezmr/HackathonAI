'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const res: { blog_post: string; images: string[] } = {
  blog_post:
    'Lorem ipsum dolor sit amet, consectetur\nadipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut\nenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  images: [
    'https://picsum.photos/500/200',
    'https://picsum.photos/400/300',
    'https://picsum.photos/1000/300',
    'https://picsum.photos/200',
  ],
};

export default function writeBlogPost() {
  let [body, setBody] = useState('');

  let i = 0;
  const speed = 15;

  const typeWriter = () => {
    body = body + res.blog_post.charAt(i);
    setBody(body);
    i++;
    setTimeout(typeWriter, speed);
  };

  return (
    <main>
      <div className='p-8 md:w-10/12 md:mx-auto text-center w-full md:10/12 xl:w-6/12 max-h-80 mx-auto'>
        <h1 className='text-4xl mt-12 font-bold text-zinc-100'>
          Escribir una entrada para BLOG
        </h1>
        <form className='w-full mt-10'>
          <div className='relative flex justify-center mt-10'>
            <textarea
              placeholder='¿Sobre qué trata este documento?'
              className='w-full pe-24 bg-transparent border-2 rounded-lg border-zinc-100 text-zinc-400 p-6 shadow-lg shadow-cyan-500/70 focus:shadow-purple-500/40 duration-300 focus:outline-none'
            ></textarea>
            <button
              className='absolute top-5 right-5 text-white font-bold ms-8'
              type='button'
              onClick={() => typeWriter()}
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className='text-zinc-100 w-5 h-5'
              />
            </button>
          </div>
        </form>

        <pre id='text' className='pt-20 text-zinc-100 text-left max-w-max'>
          {body}
        </pre>
        <div className='grid grid-cols-1'>
          {res.images.map((url, index) => (
            <img src={url} className='mx-auto my-10' key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
