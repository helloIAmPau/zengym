export default function(owner, params) {
  return fetch(`http://events/emit/${ owner }?log_uid=${ params.log_uid }`, {
    method: 'POST'
  });
};
