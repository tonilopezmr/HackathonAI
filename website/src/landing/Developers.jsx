import { Button } from "./Button";
import { Code, CodeGroup } from "./Code";

export default function Developers() {
  return (
    <section
      id="developers"
      aria-label="Developers"
      className=""
    >
    <div className="relative isolate overflow-hidden bg-gray-900">                 
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">        
        <div className="relative isolate px-6 pt-16 bg-neutral-900 shadow-2xl sm:rounded-3xl mx-auto">                          

          <div className="mx-auto max-w-md text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Toda la potenc<span className="text rounded-lg text-indigo-500/100">IA</span>
              <br />              
              en unas <span className="text rounded-lg text-indigo-500/100">Pocas Lineas</span> de código.              
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Hemos creado una nueva forma de escribir IA y DESPLEGARLA A PRODUCCIÓN FÁCILMENTE.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="https://github.com/tonilopezmr/hackathonai" className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">Empieza Ahora</a>
            
            </div>
          </div>
          <div className="w-full mt-32 max-w-4xl mx-auto">
            <div className="mbp">
            <CodeGroup tag="POST" label="/create_blog_post_with_images">           

              <Code language="python">
                {`
    @coprocessor(type="inference", model="gpt-3.5", id="create_a_blog_post")
    def create_a_blog_post(topic, model):
        prompt = f"Create a blog post of this topic: {topic}, not so long"

        result = model(prompt)
        
        return result

    @coprocessor(type="inference", model="gpt-3.5", id="get_prompt")
    def get_prompt(blog_post, model):
        prompt = f"{prompt_template} {blog_post}"

        result = model(prompt)

        return result

    @coprocessor(type="inference", model="stable-diffusion", id="text-to-image")
    def get_image_from_prompt(prompt, model):

        result = model(prompt)
        return result["output"]

    @smartpipe(path="/create_blog_post_with_images", method="POST", id="write-blog-post")
    def blog_post_to_image(input):


        topic = input
        blog_post = create_a_blog_post(topic)
        prompt = get_prompt(blog_post)
        images = get_image_from_prompt(prompt)

        return { "blog_post": blog_post, "images": images }`}
              </Code>    

              <Code language="bash" title="cURL">
                {`curl -X POST -d 'Write a blog post about how to win a Hackathon' https://smartpipes.bodia.ai/create_blog_post_with_images`}
              </Code>        

            </CodeGroup>    
            </div>     

            <p className="mt-6 text-sm leading-8 text-gray-300">
              El siguiente código, crea un blog post (gpt-3) y imagenes (sd-1.5) automáticamente.             
            </p>               
            <p className="text-sm pb-20 leading-8 text-gray-300">
              Y lo mejor de todo, lo despliegas fácilmente a producción.
            </p>               
          </div>
        </div>
      </div>
    </div>
    </section>
  )
}
