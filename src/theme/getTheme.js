import { createTheme } from '@mui/material/styles'


const getTheme = (mode = 'dark') => createTheme({
palette: {
mode,
...(mode === 'light'
? {
background: { default: '#f4f6f8', paper: '#fff' }
}
: {
background: { default: '#0f1720', paper: '#151819' }
})
},
components: {
MuiAppBar: {
styleOverrides: { root: { boxShadow: 'none' } }
}
}
})


export default getTheme