import React, { useEffect, useState } from 'react'
import { Container, StyledNav } from './Navbar.styles'
import { FiMenu } from 'react-icons/fi';
import { ButtonFill } from '../../styles/styles';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { toggleMenu } from '../../store/menu/menuSlice';
import { toggleCreateNoteModal } from '../../store/modal/modalSlice';
import getStandardName from '../../utils/getStandardName';

const Navbar = () => {
  const dispatch = useAppDispatch();

  const { pathname, state } = useLocation();
  let [status, setStatus] = useState("");
  
  useEffect(() => {
    const changeStatus = () => {
      if (state === null) {
        if (pathname === "/") {
          setStatus("notes");
        } else if (pathname === "/archive" || pathname === "/trash") {
          const prefix: string = "/";
          setStatus(pathname.slice(prefix.length));
        } else if (pathname.startsWith("/tag/")) {
          const prefix: string = "/tag/";
          setStatus(pathname.slice(prefix.length));
        }
      } else {
        setStatus(state);
      }
    };

    changeStatus();
  }, [pathname, state]);

  if (pathname === "/404") {
    return null;
  }

  return (
    <StyledNav>
      <div className='nav__menu'>
        <FiMenu onClick={() => dispatch(toggleMenu(true))} />
      </div>

      <Container>
        <div className='nav__page-title'>{getStandardName(status)} </div>

        {status !== "Trash" && status !== "Archive" &&
          <ButtonFill
            onClick={() => dispatch(toggleCreateNoteModal(true))}
            className="nav__btn"
          >
            <span>+</span>
          </ButtonFill>
        }

      </Container>
    </StyledNav>
  )
}

export default Navbar