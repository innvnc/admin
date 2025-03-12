import { Icons, UI } from '../../ui';

export const InputSearch = () => {
  return (
    <div className="navbar__search">
      <UI.Input
        isClearable
        classNames={ {
          label: 'text-black/50 dark:text-white/90',
          input: [
            'bg-transparent',
            'text-black/90 dark:text-white/90',
            'placeholder:text-default-700/50 dark:placeholder:text-white/60',
            'w-full',
            'h-6',
            'flex',
            'items-center',
            'text-center',
            'pl-2',
            'pr-2'
          ],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'bg-default-200/50',
            'dark:bg-default/60',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'dark:hover:bg-default/70',
            'group-data-[focus=true]:bg-white',
            'dark:group-data-[focus=true]:bg-white',
            '!cursor-text'
          ]
        } }
        placeholder="¿Qué te gustaría aprender?"
        radius="lg"
        startContent={ <Icons.IoSearchOutline size={ 24 } /> }
      />
    </div>
  );
};
