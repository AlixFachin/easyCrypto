# Summary
This repository contains a code project I realized during my time at [Code Chrysalis](https://www.codechrysalis.io). <br>
This project aims to demistify the RSA algorithm, or the idea of Public Key/Private Key concepts. 
In actual usage, for obvious security reasons, the numbers used are huge and as a result it is difficult to understand how things work.<br>
I tried to implement by myself the RSA algorithm with small numbers, to try to understand how the model works below the hood.

# Deployment
This page is accessible on Github pages at the following address:
<https://alixfachin.github.io/easyCrypto/>

# Disclaimer
Please kindly remember that this project is meant for teaching/understanding and as a result please **do not use the results** to encode sensitive information. I cannot be responsible for damage or negative outcomes following using this program with personal and/or sensitive information.

# How to install
* The package uses `npm` package manager.
* Download or clone the repository
* Run `npm install`
* Run `npm run start` to start the development server. You should be able to see the page with any browser on your `localhost:3000` address.

# How to do use the webpage
The page has two distinct parts:
* **Key Generator**: to try to understand what is the principle used to find public and private keys.
* **Encoding/Decoding**: Once we have a public key/private key, we can put it in practice and encode/decode any message. (Without emojis, please.)

# Description of the algorithm
## General considerations
A public key will in our case be a couple of integers `(a,b)`. <br>
The private key is constitued of another integer `p`, which, associated with the second key `b`  makes the private key `(p,b)`.

## Coding and Encoding
* We will transform characters into number, so we can assume that we want to transmit a sequence of numbers.
* In order to encode a character of code `c`, we take `c` to the power `a`.
  * The encoded character code will be the remainder of `c^a` by `b`, so `(c^a mod b)`.
* In order to decode an encoded character, we can take the encoded character `e` and proceed with a similar operation, but this time with the private key `p`, i.e. `e^p mod b`.
* If we choose `a`,`b` and `p` wisely, we can assure that `(c^a mod b)^p mod b = c` so we have decoded the message.

## Choosing the public and private keys
* As mentioned above, we need to choose `a`, `b` and `p` wisely, so that the operation works, but as well so that it is very difficult for anyone else to figure out `p` (the private key) while knowing `a` and `b` (which are public).
* Prime numbers have very interesting properties, and combining prime numbers with circular arithmetics ends up with such result.

# If you want to know more
I would recommend to look at the following videos:
* [Introduction to RSA](https://www.youtube.com/watch?v=4zahvcJ9glg&t=2s) : Great pratical explanation from Eddie Woo
* [Public key cryptography](https://www.youtube.com/watch?v=wXB-V_Keiu8&t=805s) : Video from "the Art of the Problem"
* [The Music of the Primes](https://www.goodreads.com/book/show/208916.The_Music_of_the_Primes) : Book by [Marcus du Sautoy](https://www.conted.ox.ac.uk/profiles/marcus-du-sautoy) regarding Riemann's hypothesis.
* Udemy course about [Number Theory and Cryptography](https://www.udemy.com/course/number-theory-and-cryptography/)

The following content is pretty math-heavy:
* Wikipedia page regarding [Euler's theorem](https://en.wikipedia.org/wiki/Euler%27s_theorem)
* Brilliant page regarding [Modular Arithmetic](https://brilliant.org/wiki/modular-arithmetic/)


# Technologies used
* Using <https://reactjs.org> for front-end component and state management
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* Using [JSBI](https://github.com/GoogleChromeLabs/jsbi) for management of [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), necessary for mathematical computations but impossible to transpile for backward compatibility.
* Using <https://fontflipper.com/upload> to help choosing the fonts
* Using [Unsplash](https://unsplash.com) to find background picture 