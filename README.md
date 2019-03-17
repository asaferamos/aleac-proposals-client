# ALEAC Matérias Legislativas - Client
Client desenvolvido em React.js para consumir a [API ALEAC da Assembleia Legislativa do Estado do Acre](https://github.com/asaferamos/aleac-proposals-api)

### Developing
#### Com Docker:
`sudo docker-compose up --build`

Endereço: `http://localhost:3001`

#### Rodando sem docker:
```
yarn install
REACT_APP_URL_API=http://localhost:3000 yarn start
```
_Substituir a URL acima para a url da API_
