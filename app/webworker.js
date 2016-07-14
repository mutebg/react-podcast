import faker from 'faker';

self.addEventListener('message', function(e) {

  let { type , payload } = e.data;

  switch( type ) {
    case 'PODCAST_ADD':
      self.postMessage({
        type,
        payload: {
          color: faker.internet.color(),
          showID: payload.channel_id,
        }
      });
    break;
  }

}, false);
