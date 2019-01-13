## Beat Bucket

[**Beat Bucket**](https://joebeachjoebeach.github.io/beat-bucket) is a browser-based synthesizer sequencer with a unique interface.

**Demo:**
![beat bucket demo gif](https://i.imgur.com/UIhepDn.gif)


**Here's what makes it special:**
* Like a drum machine, each track is represented by a series of beats. However, each beat is a 'bucket' that can contain multiple notes.
* If a beat has multiple notes in it, the notes are played in sequence, and the beat is automatically subdivided by the number of notes within it.
    * e.g. a quarter-note beat with two notes in it will play them as eighth notes
    * e.g. a quarter-note beat with three notes in it will play them as triplets
    * you can fill up a beat with as many notes as you like, and it will subdivide the beat accordingly
* Each track loops according to the number of beats in the track.
    * e.g. a five-beat track will loop every five beats
    * e.g. a four-beat track will loop every four beats.
    * (this allows for some neat rhythmic cycle opportunities)
* Each track can be assigned its own beat value.
    * e.g. one track can have each beat be a half note, while another has each beat be a sixteenth note.

**Features:**
* Save, share, and delete projects with a user account
* Modify projects
    * Rename projects and tracks
    * Edit project BPM
    * Add and remove tracks
* Modify tracks
    * Add and remove beats (buckets)
    * Assign beat value for individual tracks
    * Mute and solo tracks
    * Edit track volume
    * Modify track synthesizer
        * ADSR envelope
        * Oscillator selection (sine, square, triangle, saw)
        * Filters (high pass, low pass, band pass)

---

**Tools used to make this:**
* Front end:
    * React
    * React-dnd
    * Redux
    * Tone.js
    * Deployed to GitHub Pages via `gh-pages`
* Back end:
    * Flask
    * PostgreSQL
    * Deployed to Heroku as a Docker container
* Development environment:
    * Docker + Docker Compose
