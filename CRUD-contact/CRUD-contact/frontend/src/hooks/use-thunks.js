import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export function useThunks(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const dispatch = useDispatch();
  const runThunks = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setIsError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );
  return [runThunks, isLoading, isError];
}
