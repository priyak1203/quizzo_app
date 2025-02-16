import { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type CustomFormInputProps = {
  name: string;
  type: string;
  control: Control<any>;
  labelText?: string;
  description?: string;
  placeholder?: string;
  border?: boolean;
};

function CustomFormInput({
  name,
  type,
  control,
  labelText,
  description,
  placeholder,
  border,
}: CustomFormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{labelText || name}</FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              placeholder={placeholder}
              className={border ? 'border' : 'border-slate-300'}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomFormInput;
