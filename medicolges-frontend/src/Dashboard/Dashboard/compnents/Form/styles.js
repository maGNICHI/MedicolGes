 
const useStyles = () => ({
  root: {
    '& .MuiTextField-root': {
      margin: '10px',
    },
  },
  paper: {
    padding: '16px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: '10px',
  },
  inputNom: {
    width: '300px',
    '&[name="Name"]': {
      // styles for name input
    }
  },
});

export default useStyles;