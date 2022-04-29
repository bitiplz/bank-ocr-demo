const segmentsConfig = {
  processor: {
    autoCorrectRule: 'perInput',
  },
  parser: {
    extendMap: true,
    // prettier-ignore
    characterMap:
    {
        A:   ' _ '
            +'|_|'
            +'| |'
        ,
        B:   ' _ '
            +'|_\\'
            +'|_/'

        ,
        C:   ' _ '
            +'|  '
            +'|_ '

        ,
        D:   ' _ '
            +'| \\'
            +'|_/'

        ,
        E:   ' _ '
            +'|_ '
            +'|_ '

        ,
        F:   ' _ '
            +'|_ '
            +'|  '
    },
  },
}

export default segmentsConfig
