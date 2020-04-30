import superagent from 'superagent';

async function fetchGraphQL(text, variables) {
  const query = text.params ? text.params.text : text;
  // Fetch data from GitHub's GraphQL API:
  const response = await superagent.post('http://a67aadc3.ngrok.io/api').set('accept', 'application/json').send({ query: query, variables });
  return response.body;

  // Get the response as JSON
}

export default fetchGraphQL;
