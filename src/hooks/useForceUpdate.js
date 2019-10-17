import { useCallback, useState } from 'react';

// export const useForceUpdate = () => {
//   const [ , dispatch ] = useState(Object.create(null));
//
//   return useCallback(
//     () => {
//       dispatch(Object.create(null));
//     },
//     [ dispatch ],
//   );
// };


// export default function useForceUpdate() {
//   const [ , dispatch ] = useState(Object.create(null));
//
//   // Turn dispatch(required_parameter) into dispatch().
//   const memoizedDispatch = useCallback(
//     () => {
//       dispatch(Object.create(null));
//     },
//     [ dispatch ],
//   );
//   return memoizedDispatch;
// }

export const useForceUpdate = () => useState()[1];