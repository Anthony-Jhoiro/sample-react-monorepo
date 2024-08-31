import z from 'zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ToggleGroup,
  ToggleGroupItem,
} from '@home-dashboard/react-components';

const textCellSchema = z.object({
  type: z.literal('text'),
  label: z.string().max(128),
});

const linkCellSchema = z.object({
  type: z.literal('link'),
  label: z.string().max(128),
  href: z.string().url(),
});

export const schema = z.object({
  name: z.string().min(1).max(50),
  meta: z.union([textCellSchema, linkCellSchema]),
  dimensions: z.object({
    width: z.preprocess(
      (v) => parseInt(z.string().parse(v), 10),
      z.number().min(1).max(8)
    ),
    height: z.preprocess(
      (v) => parseInt(z.string().parse(v), 10),
      z.number().min(1).max(8)
    ),
  }),
});

type Translations = {
  title: string;
  submitButton: string;
  fields: {
    name: {
      label: string;
      placeholder: string;
    };
    type: {
      label: string;
    };
    href: {
      label: string;
      placeholder: string;
    };
    label: {
      label: string;
      placeholder: string;
    };
    dimensionsHeight: {
      label: string;
      placeholder: string;
    };
    dimensionsWidth: {
      label: string;
      placeholder: string;
    };
  };
};

export type Props = {
  t: Translations;
  onSubmit: (values: z.infer<typeof schema>) => void;
};

export const NewCellForm: FC<Props> = ({ t, onSubmit }) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      meta: {
        type: 'text',
        label: '',
      },
      dimensions: {
        width: 1,
        height: 1,
      },
    },
  });

  const formType = form.watch('meta.type');

  function submit(values: z.infer<typeof schema>) {
    console.log(values);
    onSubmit(values);
  }

  return (
    <div>
      <h1>{t.title}</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.fields.name.label}</FormLabel>
                <FormControl>
                  <Input placeholder={t.fields.name.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.fields.type.label}</FormLabel>
                <FormControl>
                  <ToggleGroup
                    type="single"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <ToggleGroupItem value="text">Text</ToggleGroupItem>
                    <ToggleGroupItem value="link">Link</ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta.label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.fields.label.label}</FormLabel>
                <FormControl>
                  <Input placeholder={t.fields.label.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {formType === 'link' && (
            <FormField
              control={form.control}
              name="meta.href"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.fields.href.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.fields.href.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="dimensions.height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.fields.dimensionsHeight.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.fields.dimensionsHeight.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dimensions.width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.fields.dimensionsWidth.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.fields.dimensionsWidth.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{t.submitButton}</Button>
        </form>
      </Form>
    </div>
  );
};
