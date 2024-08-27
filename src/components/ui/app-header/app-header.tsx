import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo
} from '@zlden/react-developer-burger-ui-components';
import { TAppHeaderUIProps } from './type';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `${styles.link} p-5 ${isActive ? styles.active : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <span className='text text_type_main-default ml-2'>
                Конструктор
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to='/feed'
          className={({ isActive }) =>
            `${styles.link} p-5 ml-2 ${isActive ? styles.active : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <span className='text text_type_main-default ml-2'>
                Лента заказов
              </span>
            </>
          )}
        </NavLink>
      </div>

      <div className={styles.logo}>
        <NavLink to='/'>
          <Logo className={''} />
        </NavLink>
      </div>

      <NavLink
        to='/profile'
        className={({ isActive }) =>
          `${styles.link} p-5 ${styles.menu_part_right} ${
            isActive ? styles.active : ''
          }`
        }
      >
        {({ isActive }) => (
          <>
            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            <span className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </span>
          </>
        )}
      </NavLink>
    </nav>
  </header>
);
