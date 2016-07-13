export default function formatMB(bytes) {
   let res = bytes / ( 1000 * 1000 );
   console.log();
   return res > 1 ? res.toFixed(0) : res.toFixed(2);
}
