import config from './config'

const url = config.API_ENDPOINT
const endpoints = ['notes', 'folders']

export const getAllNotesAndFolders = () => {
    return Promise.all(endpoints.map( e => 
        fetch(url.concat(e))
          .then(res => {
          if (!res.ok) {
            throw new Error('Unable to fetch from server');
          }
          return res.json()
          })
          
        
      ))
}

// .then(resJson => this.setState({
//     [e]: resJson
//   })) 