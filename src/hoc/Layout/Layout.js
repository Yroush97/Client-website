import React, { useState, useCallback } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
const Navigation = styled.header`
  .Nav {
    width: 100%;
    display:flex;
    .Logo {
        width: 152px;
        height: 43px;
        margin: 39px auto auto 67px;
    }
   
    .Burger{
      padding: 13px;
      display:none;
       & .Line1,
       & .Line2,
       & .Line3{
         width:30px;
         height:5px;
         margin: 3px;
         background-color: ${props => props.color};
         transition: all 0.5s ease;
        }
    }
    ul{
        width: 30%;
        list-style: none;
        display:flex;
        justify-content: space-between;
        margin-right: 161px;
        .Img{
          margin:20px;
        }
    }
}
@media screen and (max-width: 1200px) {
  .Nav {
      ul{
        width: 50%;
        margin-right: 100px !important;
        .Li {
          display:flex;
        }
      } 
}
}
@media screen and (max-width: 740px) {
    .Nav {
        .List {
          height: 500px;
          z-index:9;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-item:center;
          text-align:center;
          flex-wrap: wrap;
          padding: 0px;
          width: 100% !important;
          position: fixed;
          background-color: ${props => props.background};
          margin: 60px 0px 0px 0px;
          overflow: hidden;
          max-height: 0;
          transform: translateX(100%);
          transition: all 0.8s ease;
          list-style: none;
          &.is-expanded{
            z-index:9;
            overflow: hidden;
            max-height:500px;
            height: 500px;
            transform: translateX(0%) !important;
            transition: transform 0.8s ease;
            -moz-transition-duration: 0.4s;
            -webkit-transition-duration: 0.4s;
            -o-transition-duration: 0.4s;
            transition-duration: 0.4s;
            -moz-transition-timing-function: ease-in;
            -webkit-transition-timing-function: ease-in;
            -o-transition-timing-function: ease-in;
            transition-timing-function: ease-in;
             .Img{
               margin: auto;
             }
          }
      }
        div.Burger{
            display: block !important;
            cursor: pointer;
        
        &.toggle{
          display: block !important;
          cursor: pointer;
          transition:all .5s;
          .Line1 {
              transform: rotate(-45deg) translate(0px, 8px) !important;
              transition: transform .5s;
          }
      
          .Line2 {
              opacity: 0;
              transition: transform .5s;
      
          }
    
          .Line3 {
              transform: rotate(45deg) translate(-3px, -12px) !important;
              transition: transform .5s;
          }
      }
    }
        .Logo {
            // text-align: center !important;
            margin: 10px auto auto 10px !important;
        }
    }


}
@media screen and (max-width: 1400px) {
  
 
    .Nav {
        .Logo {
            width: 152px !important;
            height: 37px !important;
        }

        .List {
            .Li {
                font-size: 20px !important;
            }
        }
    }
}
  `
const Layout = (props) => {
  const isAuthenticated = useSelector(state => state.auth.token !== null)
  const Img = useSelector(state => state.auth.img)
  const [isExpanded, setisExpanded] = useState(false);
  let activeStyle = { transition: '0.5s ease-in-out', color: '#50d2c2' }

  const handleToggle = useCallback((e) => {
    e.preventDefault();
    setisExpanded(!isExpanded);
  }, [isExpanded, setisExpanded])
  return (
    <Navigation color={props.color} background={props.background}>
      <nav className='Nav'>
        <img src={props.Logo} alt="logo" className='Logo' />
        {!isAuthenticated ?
          <ul className={`List ${isExpanded ? "is-expanded" : ''}`} id='activeList' background={props.background}>
            <li className={props.class}>
              <NavLink to='/' activeStyle={activeStyle} exact >Home</NavLink>
            </li>

            <li className={props.class}>
              <NavLink to='/SignUp' activeStyle={activeStyle}>Register</NavLink>
            </li>

            <li className={props.class}>
              <NavLink to='/Login' activeStyle={activeStyle}>Login</NavLink>
            </li>
          </ul>
          :
          <ul className={`List ${isExpanded ? "is-expanded" : ''}`} id='activeList' background={props.background}>
            <li className={props.class}>
              <NavLink to={'/'} activeStyle={activeStyle} exact >Home</NavLink>
            </li>

            <li className={props.class}>
              <NavLink to={'/Account'} activeStyle={activeStyle}>Account</NavLink>
            </li>
            <li className={props.class}>
              <NavLink to={'/Logout'} activeStyle={activeStyle}>Logout</NavLink>
            </li>
            {!Img ?
              <li className={props.class}>
                <Avatar alt="user img" src={props.Man} className={props.Avatar} />
              </li>
              :
              <li className={props.class}>
                <Avatar alt="user img" src={Img} className='Img' />
              </li>
            }
          </ul>
        }
        <div className={`Burger ${isExpanded ? "toggle" : ''}`} onClick={handleToggle}>
          <div className='Line1' color={props.color}></div>
          <div className='Line2' color={props.color}></div>
          <div className='Line3' color={props.color}></div>
        </div>
      </nav>
    </Navigation>

  )
};
export default Layout;
