# Summary
This small project comes from the fact that we encounter many times the concept of "public key" and "private key", but it is actually pretty difficult to find explanation of *how* those keys practically work.
Due to security requirements, the numbers involved in this are huge and this prevents basic understanding.
I tried then to implement the algorithm by myself to understand the basics.

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
The algo

# If you want to know more
I would recommend to look at the following videos:
* [Introduction to RSA](https://www.youtube.com/watch?v=4zahvcJ9glg&t=2s) : Great pratical explanation from Eddie Woo
* [Public key cryptography](https://www.youtube.com/watch?v=wXB-V_Keiu8&t=805s) : Video from "the Art of the Problem"
* [The Music of the Primes](https://www.goodreads.com/book/show/208916.The_Music_of_the_Primes) : Book by [Marcus du Sautoy](https://www.conted.ox.ac.uk/profiles/marcus-du-sautoy) regarding Riemann's hypothesis.


# Technologies used
* Using <https://reactjs.org> for front-end component and state management
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* Using [JSBI](https://github.com/GoogleChromeLabs/jsbi) for management of [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), necessary for mathematical computations but impossible to transpile for backward compatibility.
* Using <https://fontflipper.com/upload> to help choosing the fonts
* Using [Unsplash](https://unsplash.com) to find background picture 