# node-tunes
## Otherwise known as
```
   ____   _   _  U _____ u   ____   _  __         __  __  __   __
U /"___| |'| |'| \| ___"|/U /"___| |"|/ /       U|' \/ '|u\ \ / /
\| | u  /| |_| |\ |  _|"  \| | u   | ' /        \| |\/| |/ \ V /
 | |/__ U|  _  |u | |___   | |/__U/| . \\u       | |  | | U_|"|_u
  \____| |_| |_|  |_____|   \____| |_|\_\        |_|  |_|   |_|
 _// \\  //   \\  <<   >>  _// \\,-,>> \\,-.    <<,-,,-..-,//|(_
(__)(__)(_") ("_)(__) (__)(__)(__)\.)   (_/      (./  \.)\_) (__)
      _____    _   _   _   _   U _____ u ____          _
     |_ " _|U |"|u| | | \ |"|  \| ___"|// __"| u     U|"|u
       | |   \| |\| |<|  \| |>  |  _|" <\___ \/      \| |/
      /| |\   | |_| |U| |\  |u  | |___  u___) |       |_|
     u |_|U  <<\___/  |_| \_|   |_____| |____/>>      (_)
     _// \\_(__) )(   ||   \\,-.<<   >>  )(  (__)     |||_
    (__) (__)   (__)  (_")  (_/(__) (__)(__)         (__)_)
```
is a music management platform.

Once a user creates their profile, they can create and delete artists, albums, and
songs.

It can be viewed at
[www.tunes.caleb-gregory.com](http://www.tunes.caleb-gregory.com)

# Accomplished Goals
- Create models and route controllers for each collection of data
- Use MongoDB's Node.js driver to create a fully functioning CRUD app
  with a document structure
- Use bcrypt and express-session to handle user authentification and
  sessions

## On the Data Structure
This database has four data collections: User, Artist, Album, and
Song.

There is no hierarchical structure among these - rather a document in
each collection holds a reference via uuid to its conceptual parent,
```
song.albumId -> album._id,
                album.artistId -> artist._id,
                                  artist.userId -> user._id
```
This project was my first interaction with a noSQL database, and
thinking through the data structure was probably my favorite part of the
project. Well, that and coming up with this
[Album.removeAll](https://github.com/calebgregory/node-tunes/blob/master/models/Album.js#L67-L80) function, which was challenging because I was working in an asynchronous environment.

# Desired Features

- Better styling
- More complete and performant ASCII animation

The styling on this guy is pretty thrown together. My goals for the
project had nothing to do with styling, so it was not a big priority.
If you found the ASCII animation on your own, that's awesome! If you haven't yet, it
shouldn't be too hard to find. I worked on that for probably way too
long.

The way it works currently is by using `$('someEl').show()` and `$('allTheOtherEls').hide()` on `pre` elements containing each frame. This happens in a for-loop that gets called on `window.resize`. _Woof_. What this means is that you'll get a rainbow wheel for your cursor after resizing the window for a few seconds. That's not a CSS-selected cursor - yep, definitely a browser thing. This was a first-draft solution to the problem, and I never got around to separating my concerns into an event -> state -> render loop pattern with an array storing the frames as views. So it goes. _Cheers to Version 2!_

# License
The MIT License (MIT)

Copyright (c) 2015 Caleb Gregory

Permission is hereby granted, free of charge, to any person obtaining a
copy
of this software and associated documentation files (the "Software"), to
deal
in the Software without restriction, including without limitation the
rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE
SOFTWARE.
