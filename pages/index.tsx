import { Fragment, useEffect, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { NextSeo } from 'next-seo';
import BottomFooter from '../components/bottomfooter';

const navigation = {
  categories: [],
  pages: [
    { name: 'Discord', href: 'https://discord.gg/apjxYjVvKd' },
    { name: 'Store', href: 'https://store.justicerp.xyz' },
    { name: 'Status', href: 'https://status.justicerp.xyz' },
    { name: 'CAD', href: 'https://sonorancad.com/' },
  ],
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

interface PlayerDetails {
  fetched: boolean;
  players: number;
  maxPlayers: number;
}

const Index = () => {
  const [open, setOpen] = useState(false);
  const [playerDetails, setPlayerDetails] = useState<PlayerDetails>({
    fetched: false,
    players: 0,
    maxPlayers: 0,
  });
  useEffect(() => {
    (async () => {
      const req = await fetch('/api/server');
      const json = await req.json();
      setPlayerDetails(json as PlayerDetails);
    })();
  });
  return (
    <>
      <NextSeo title='Welcome' />
      <div>
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 flex z-40 lg:hidden'
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='relative max-w-xs w-full bg-r shadow-xl pb-12 flex flex-col overflow-y-auto'>
                <div className='px-4 pt-5 pb-2 flex'>
                  <button
                    type='button'
                    className='-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400'
                    onClick={() => setOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as='div' className='mt-2'>
                  <div className='border-b border-gray-200'>
                    <Tab.List className='-mb-px flex px-4 space-x-8'>
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-900 border-transparent',
                              'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className='pt-10 pb-8 px-4 space-y-10'
                      >
                        <div className='grid grid-cols-2 gap-x-4'>
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className='group relative text-sm'
                            >
                              <div className='aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75'>
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className='object-center object-cover'
                                />
                              </div>
                              <a
                                href={item.href}
                                className='mt-6 block font-medium text-gray-900'
                              >
                                <span
                                  className='absolute z-10 inset-0'
                                  aria-hidden='true'
                                />
                                {item.name}
                              </a>
                              <p aria-hidden='true' className='mt-1'>
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className='font-medium text-gray-900'
                            >
                              {section.name}
                            </p>
                            <ul
                              role='list'
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className='mt-6 flex flex-col space-y-6'
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className='flow-root'>
                                  <a
                                    href={item.href}
                                    className='-m-2 p-2 block text-gray-500'
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className='border-t border-gray-200 py-6 px-4 space-y-6'>
                  {navigation.pages.map((page) => (
                    <div key={page.name} className='flow-root'>
                      <a
                        href={page.href}
                        className='-m-2 p-2 block font-medium text-r hover:text-j'
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className='border-t border-gray-200 py-6 px-4 space-y-6'>
                  <div className='flow-root'>
                    <a
                      href='#'
                      className='-m-2 p-2 block font-medium text-gray-900'
                    >
                      Sign in
                    </a>
                  </div>
                  <div className='flow-root'>
                    <a
                      href='#'
                      className='-m-2 p-2 block font-medium text-gray-900'
                    >
                      Create account
                    </a>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <header className='relative overflow-hidden'>
          {/* Top navigation */}
          <nav aria-label='Top' className='relative z-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='h-36 flex items-center'>
                <button
                  type='button'
                  className='bg-r p-2 rounded-md text-gray-400 lg:hidden'
                  onClick={() => setOpen(true)}
                >
                  <span className='sr-only'>Open menu</span>
                  <MenuIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                <div className='ml-4 flex lg:ml-0'>
                  <span>
                    <span className='sr-only'>JusticeRP</span>
                    <img
                      className='h-20 w-auto'
                      src='/jrp.png'
                      alt='JusticeRP logo featuring a car, red white and blue lettering, and a blue city background.'
                    />
                  </span>
                </div>

                {/* Flyout menus */}
                <Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
                  <div className='h-full flex space-x-8'>
                    {navigation.pages.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        target='_blank'
                        className='flex items-center text-md font-medium text-r hover:text-j'
                      >
                        {page.name}
                      </a>
                    ))}
                  </div>
                </Popover.Group>

                <div className='ml-auto flex items-center'>
                  <a href='https://status.justicerp.xyz' target='_blank'>
                    <div className='text-md font-medium hidden bg-d px-4 py-2 text-j hover:bg-j hover:text-r rounded-full shadow-lg lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                      <span>
                        {playerDetails.fetched
                          ? `${playerDetails.players} / ${playerDetails.maxPlayers}`
                          : '/'}{' '}
                        Players Online
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Hero section */}
          <div className='pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48'>
            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static'>
              <div className='sm:max-w-lg'>
                <h1 className='text-4xl font font-extrabold tracking-tight text-p sm:text-5xl'>
                  Your final FiveM roleplay destination
                </h1>
                <p className='mt-4 text-xl text-r'>
                  JusticeRP is a FiveM server that continually delivers
                  perfection. We offer constant uptime, a friendly community,
                  and exhilerating experiences.
                </p>
              </div>
              <div>
                <div className='mt-10'>
                  {/* Decorative image grid */}
                  <div
                    aria-hidden='true'
                    className='pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full'
                  >
                    <div className='absolute sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'>
                      <div className='flex items-center space-x-6 lg:space-x-8'>
                        <div className='flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8'>
                          <div className='w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100'>
                            <img
                              src='8.jpg'
                              alt='GTA 5 Cinematic'
                              className='w-full h-full object-center object-cover'
                            />
                          </div>
                          <div className='w-44 h-64 rounded-lg overflow-hidden'>
                            <img
                              src='2.jpg'
                              alt='GTA 5 Cinematic'
                              className='w-full h-full object-center object-cover'
                            />
                          </div>
                        </div>
                        <div className='flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8'>
                          <div className='w-44 h-64 rounded-lg overflow-hidden'>
                            <img
                              src='3.jpg'
                              alt='GTA 5 Cinematic'
                              className='w-full h-full object-center object-cover'
                            />
                          </div>
                          <div className='w-44 h-64 rounded-lg overflow-hidden'>
                            <img
                              src='4.png'
                              alt='GTA 5 Cinematic'
                              className='w-full h-full object-center object-cover'
                            />
                          </div>
                          <div className='w-44 h-64 rounded-lg overflow-hidden'>
                            <img
                              src='5.png'
                              alt='GTA 5 Cinematic'
                              className='w-full h-full object-center object-cover'
                            />
                          </div>
                        </div>
                        <div className='flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8'>
                          <div className='w-44 h-64 rounded-lg overflow-hidden'>
                            <img
                              src='6.jpg'
                              alt='GTA 5 Cinematic'
                              className='w-full h-full object-center object-cover'
                            />
                          </div>
                          <div className='w-44 h-64 rounded-lg overflow-hidden'>
                            <img
                              src='7.jpg'
                              alt='GTA 5 Cinematic'
                              className='w-full h-full object-center object-cover'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href='https://cfx.re/join/nomvq7'
                    target='_blank'
                    className='inline-block text-center bg-p border border-transparent rounded-md py-3 px-8 font-medium text-r hover:bg-j'
                  >
                    Connect now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* Category section */}
          <section aria-labelledby='category-heading'>
            <div className='max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
              <div className='sm:flex sm:items-baseline sm:justify-between'>
                <h2
                  id='category-heading'
                  className='text-2xl font-extrabold tracking-tight text-p'
                >
                  Level up your JusticeRP experience
                </h2>
                <a
                  href='https://store.justicerp.xyz/'
                  target='_blank'
                  className='hidden text-sm font-semibold text-p hover:text-j sm:block'
                >
                  View our full store menu
                  <span aria-hidden='true'> &rarr;</span>
                </a>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8'>
                <div className='group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2'>
                  <img
                    src='/police.png'
                    alt='A GTA 5 police charger with its lights on.'
                    className='object-center object-cover group-hover:opacity-75'
                  />
                  <div
                    aria-hidden='true'
                    className='bg-gradient-to-b from-transparent to-black opacity-50'
                  />
                  <div className='p-6 flex items-end'>
                    <div>
                      <h3 className='font-semibold text-r'>
                        <a
                          target='_blank'
                          href='https://store.justicerp.xyz/category/leo-vehicle-packs'
                        >
                          <span className='absolute inset-0' />
                          LEO Vehicle Packs
                        </a>
                      </h3>
                      <p aria-hidden='true' className='mt-1 text-sm text-r'>
                        Buy now
                      </p>
                    </div>
                  </div>
                </div>
                <div className='group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full'>
                  <img
                    src='/weapons.png'
                    alt='A GTA 5 character holding an assault rifle.'
                    className='object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full'
                  />
                  <div
                    aria-hidden='true'
                    className='bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0'
                  />
                  <div className='p-6 flex items-end sm:absolute sm:inset-0'>
                    <div>
                      <h3 className='font-semibold text-r'>
                        <a
                          target='_blank'
                          href='https://store.justicerp.xyz/category/weapons'
                        >
                          <span className='absolute inset-0' />
                          Weapons
                        </a>
                      </h3>
                      <p aria-hidden='true' className='mt-1 text-sm text-r'>
                        Shop now
                      </p>
                    </div>
                  </div>
                </div>
                <div className='group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full'>
                  <img
                    src='/supercar.png'
                    alt='A GTA 5 super car driving over a bridge.'
                    className='object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full'
                  />
                  <div
                    aria-hidden='true'
                    className='bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0'
                  />
                  <div className='p-6 flex items-end sm:absolute sm:inset-0'>
                    <div>
                      <h3 className='font-semibold text-r'>
                        <a
                          target='_blank'
                          href='https://store.justicerp.xyz/category/civilian-vehicle-pac'
                        >
                          <span className='absolute inset-0' />
                          Civilian Vehicle Packs
                        </a>
                      </h3>
                      <p aria-hidden='true' className='mt-1 text-sm text-r'>
                        Shop now
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-6 sm:hidden'>
                <a
                  href='#'
                  className='block text-sm font-semibold text-indigo-600 hover:text-indigo-500'
                >
                  Browse all categories<span aria-hidden='true'> &rarr;</span>
                </a>
              </div>
            </div>
          </section>
        </main>

        <BottomFooter />
      </div>
    </>
  );
};

export default Index;
