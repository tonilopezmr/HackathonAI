export const tutorial = `
#### 📭 You don't have any Smart Pipe yet, follow this tutorial to create your first Smart Pipe.

## Seaplane Smart Pipes

### Installation

~~~shell
pip install seaplane
~~~

### Configure your API KEYS

For using some of the available Coprocessors, you have to provide some of the API KEYS. 


~~~python
from seaplane import sea

api_keys = {
    "SEA_API_KEY": "...",  # Seaplane Coprocessors
    "OPENAI_API_KEY": "...", # OpenAI Coprocessor
    "RE_API_KEY": "...",  # Replicate Coprocessor
}

config.set_api_keys(api_keys)
~~~

or If you only need to set up the Seaplane API Key, you can use ***config.set_api_key*** :

~~~python
config.set_api_key("...")
~~~

### Usage

For writing your frist Smart Pipe you have to import four elements from the Seaplane Python SDK, ***config***, ***smartpipe***, ***coprocessor*** and ***start***

* ***config*** is the Configuration Object for setting the API Keys
* ***smartpipe*** is the decorator for defining a Seaplane Smart Pipe
* ***coprocessor*** is the decorator for defining a Seaplane Coprocessor
* ***start*** is the function needed to run your Smart Pipes locally, It needs to locale it at the end of the Smart Pipes file.

You can run this Smart Pipe locally if you have a Seaplane API Key:

demo.py:

~~~python
from seaplane import config, smartpipe, coprocessor, start

api_keys = {
    "SEA_API_KEY": "sp-test-api-key",  # Seaplane Coprocessors
}

config.set_api_keys(api_keys)

@smartpipe(path='/my-api-endpoint', method="POST", id='my-smart-pipe')
def my_smartpipe(body):
  
    @coprocessor(type='inference', model='bloom', id='my-bloom-coprocessor')
    def bloom_inference(input, model):

      # run your inference here
      return model(input)
  
    return bloom_inference(body)

start()
~~~

⚠️ Don't forget **start()** at the end of the file.

~~~shell
$ python demo.py
$[Seaplane] 🧠 Smart Pipe: my-smart-pipe, Path: /my-api-endpoint
$ * Serving Flask app 'seaplane.smartpipes.smartapi'
$ * Debug mode: off
$ * Running on http://127.0.0.1:1337
~~~

You'll able to call ***my-smart-pipe*** with the following curl:

~~~curl
curl -X POST -H "Content-Type: application/json" -d 'This is a test' http://127.0.0.1:1337/my-api-endpoint
~~~

## Available LLM Models

* Seaplane Bloom ID: ***model='bloom'***
* OpenAI GPT-3 ID: ***model='GPT-3'***
* OpenAI GPT-3.5 ID: ***model='GPT-3.5'***
* Replicate Stable Diffusion 1.5 ID: ***model='stable-diffusion'***

For using this models you have to indicate in the coprocessor of ***type='inference'*** which model you want to use for example **bloom** using ***model='bloom'***


`