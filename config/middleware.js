module.exports = {
  load: {
    before: ['lib'],
  },
  settings: {
    lib: {
      enabled: true,
    },
    parser: {
      // ...
      formLimit: '10mb', // modify here limit of the form body
      jsonLimit: '10mb', // modify here limit of the JSON body
      formidable: {
        maxFileSize: 100 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
}
