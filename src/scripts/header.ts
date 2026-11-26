/** Header: solid-on-scroll, hide-on-scroll-down, services dropdown, mobile menu. */

const header = document.querySelector<HTMLElement>('[data-header]');

if (header) {
  /* ── Scroll state ───────────────────────────── */
  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-solid', y > 40);
    const menuOpen = document.documentElement.classList.contains('menu-open');
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (!menuOpen && goingDown && y > 480) header.classList.add('is-hidden');
    else if (goingUp || y < 200) header.classList.remove('is-hidden');
    lastY = y;
    ticking = false;
  };
  update();
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));

  /* ── Services dropdown (click/keyboard; hover handled in CSS) ── */
  const dropdown = header.querySelector<HTMLElement>('[data-dropdown]');
  const trigger = dropdown?.querySelector<HTMLButtonElement>('[data-dropdown-trigger]');
  if (dropdown && trigger) {
    const setOpen = (open: boolean) => {
      trigger.setAttribute('aria-expanded', String(open));
      dropdown.classList.toggle('is-open', open);
      dropdown.classList.toggle('is-closed', !open);
    };
    trigger.addEventListener('click', () => setOpen(trigger.getAttribute('aria-expanded') !== 'true'));
    dropdown.addEventListener('mouseenter', () => {
      dropdown.classList.remove('is-closed');
      trigger.setAttribute('aria-expanded', 'true');
    });
    dropdown.addEventListener('mouseleave', () => {
      if (!dropdown.classList.contains('is-open')) trigger.setAttribute('aria-expanded', 'false');
    });
    dropdown.addEventListener('focusout', (e) => {
      if (!dropdown.contains(e.relatedTarget as Node)) {
        dropdown.classList.remove('is-open', 'is-closed');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        trigger.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target as Node) && dropdown.classList.contains('is-open')) setOpen(false);
    });
  }

  /* ── Mobile menu ────────────────────────────── */
  const menu = header.querySelector<HTMLElement>('[data-mobile-menu]');
  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const close = header.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (menu && toggle && close) {
    const focusables = () =>
      Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter((el) => el.offsetParent !== null);

    const open = () => {
      menu.hidden = false;
      document.documentElement.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(() => {
        menu.classList.add('is-open');
        close.focus();
      });
    };
    const shut = (restoreFocus = true) => {
      menu.classList.remove('is-open');
      document.documentElement.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      const done = () => {
        menu.hidden = true;
      };
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) done();
      else setTimeout(done, 350);
      if (restoreFocus) toggle.focus();
    };

    toggle.addEventListener('click', open);
    close.addEventListener('click', () => shut());
    menu.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('a')) shut(false);
    });
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') shut();
      if (e.key === 'Tab') {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', (mq) => {
      if (mq.matches && !menu.hidden) shut(false);
    });
  }
}
