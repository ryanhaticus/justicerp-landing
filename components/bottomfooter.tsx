const navigation = {
  main: [
    { name: 'Discord', href: 'https://discord.gg/apjxYjVvKd' },
    { name: 'Store', href: 'https://store.justicerp.xyz' },
    { name: 'Status', href: 'https://status.justicerp.xyz' },
    { name: 'CAD', href: 'https://sonorancad.com/' },
  ],
};

const BottomFooter = () => {
  return (
    <footer>
      <div className='max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8'>
        <nav
          className='-mx-5 -my-2 flex flex-wrap justify-center'
          aria-label='Footer'
        >
          {navigation.main.map((item) => (
            <div key={item.name} className='px-5 py-2'>
              <a
                target='_blank'
                rel='noreferrer'
                href={item.href}
                className='text-base text-r hover:text-j'
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>

        <div className='mt-8 text-center text-base text-r'>
          <p className=''>
            &copy; {new Date().getFullYear()} JusticeRP. All rights reserved.
          </p>
          <p>Designed and developed with ♡ by Haticus.</p>
        </div>
      </div>
    </footer>
  );
};

export default BottomFooter;
