import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    {/* this client is a prop */}
    <App />
    {/*this above <App /> will make sure that we can make use of reat-query in our application  */}
  </QueryClientProvider>,
  document.getElementById('root')
);