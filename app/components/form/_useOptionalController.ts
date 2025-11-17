import { useRef } from 'react';
import { useController, useForm } from 'react-hook-form';

import type {
  Control,
  DefaultValues,
  FieldValues,
  Path,
  RegisterOptions,
  UseControllerReturn,
} from 'react-hook-form';

const FALLBACK_NAME = '__optional__';

const useOptionalController = <TFieldValues extends FieldValues>(
  params: {
    control?: Control<TFieldValues>;
    name?: Path<TFieldValues>;
    rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  },
): { controller: UseControllerReturn<TFieldValues>; isActive: boolean } => {
  const { control: fallbackControl } = useForm<TFieldValues>({
    defaultValues: {} as DefaultValues<TFieldValues>,
  });
  const fallbackNameRef = useRef<Path<TFieldValues>>(
    FALLBACK_NAME as Path<TFieldValues>,
  );

  const isActive = Boolean(params.control && params.name);

  const controller = useController<TFieldValues>({
    control: (isActive ? params.control : fallbackControl) as Control<TFieldValues>,
    name: (isActive ? params.name : fallbackNameRef.current) as Path<TFieldValues>,
    rules: params.rules,
  });

  return { controller, isActive };
};

export default useOptionalController;
