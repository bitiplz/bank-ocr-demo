![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/bitiplz/bank-ocr-demo/ci.yml?label=build&branch=main)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/bitiplz/bank-ocr-demo/test.yml?label=tests&branch=main)

# Bank OCR Demo App

Mvp demo for a simple web app to process text files and extract bank account numbers.

---

### Install & Run

```
yarn install
```

then

```
yarn demo  // once
```

or

```
yarn build // once
yarn start
```

## Input requirements

App currently supports simle .txt files with utf8 content.

Every record is expected to be a set of 'characters' constructed from `|`,`_`,`\`,`/`s of a length of 9, each in its own line.

Every character is a 3x3 matrix of symbols (much like 7-segment displays) with no separation between them.

eg.:

```javascript
 _  _  _  _  _  _     _  _
|_| _||_| _||_||_|  | _|  |
 _| _| _||_ |_||_|  | _|  |
 _  _     _  _  _  _  _  _
 _|| \|_||   _||_ |_||_||_|
 _||_/  ||_  _||_  _|| ||_|
```

Supported characters are the HEX number representation characters (0-F uppercase).

However this can be customized, see config section.

---

### Output

Output is shown automatically upon file upload, or later available on the `/result/:fileId` url.

Uploaded file history is available on `/result` page.

Pages are `SSR` by default.

Functionality is also made available on endpoints

```
/api/ocr/files
// GET to get the list of previously processed files

/api/ocr/file:id
// GET to get the processed result of a file

/api/ocr/file
// POST to upload and process a new file, with the content added to the request body
```

- Note that, endpoints response contains only a `message` when something is wrong, no application data is returned then.

The output of each files processed is an array of records found, containing the

1. the input characters of the record per lines (3x9 chars)
2. the recognized Accountnumber
3. the status of the result

( the files id, original name, and the creation date is also available for every
result )

Result account numbers are 9 long strings.

`?` character is shown for unrecognized characters.

Result status can be

1. `OK` - when account number is valid (checksum)
2. `ILL` - when account number is recognized full but is now valid (checksum)
3. `AMB` - when account number is not recognized first, autocorrection was available, but had multiple possible outcomes, so that no trivial acn could be derived
4. `ERR` - when entry contained invalid characters, so that no accountnumber could could be recognized
5. `!` - any other error happened during processing (this should not happen). This status is appears as `status:null` in the response when using the endpoints

---

### Config

Configuration is available a `config.js` available at `/features/segments`.

---

options for parser:

`characterMap` - custom character map to the parser. An object with fields as target characters being the keys, and to-recognize patterns as singleline strings as values.

`extendmap` - boolean, to tell the parser wether to extend the default charMap with the one in the config, or replace that.

`charactersPerEntry` - number, setting the target number of characters per record

---

options for recognizer:

`autoCorrectRule` - string, one of `none`,`perInput`,`perChar` telling the recognizer which way it should try to correct the parsed records. `none` validates, but does no correction. `perInput` allows trivial (1 to 1) character corrections on `?`-s in the result, and guessing by swapping ONE additional segment PER RECORD (acn). `perChar` option works as `perInput`, but allows for one change PER CHARACTER, that is 9 per record.
Default is `perInput`

---

by adding a db:

the application uses adapters for data sources, by default its a simple `.json` file. To connect to an another one, a new adapter should be implemented for that one under `lib/db/adapters` exporting a

`{ get, add }` adapter object.

See the jsondb adapter for exaple.

---

styling:

change color by changing var values in `global.css`

---

### Spec

You can find additional info from specs under `/docs`

---

### Additional

- this demo does not contain any input/file validation, or data virtualization. Please use files in the specified format and size.
- demo app uses jsondb, which requires a `mydbv.json` at `/`.
- uploaded files are temprarily stored under `/public/files`, make sure that the folder exits, when using starting the app.
- Please be aware the application is desktop first, this demo is not fully responsive or small-screen-safe
- Further optimazitions, caching, data virtualization, recognizer performance tweaks, etc or configuration to export as static/ offline app could be added in the future.
