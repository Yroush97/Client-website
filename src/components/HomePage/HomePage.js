import React from 'react';
import mobiles from '../../assest/Layer2.svg';
import GooglePlay from '../../assest/google-play-icon.png';
import classes from './HomePage.module.scss';
import Layout from '../../hoc/Layout/Layout';
import Logo from '../../assest/Group19.svg';
import Man from '../../assest/man.svg';
const HomePage = () => {
    const changeUrl = () => {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.i2vpn.i2vpn&hl=en_US';
    }
    return (
        <div className={classes.Container}>
            <Layout Logo={Logo} class={classes.Li} Man={Man} Avatar={classes.Avatar} background='#19374c' color='white' />
            <main className={classes.Main}>
                <section className={classes.sec1}>
                    <p className={classes.Head}>MOBILE APP</p>
                    <p className={classes.Para}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <button className={classes.Button} onClick={changeUrl}>
                        <img src={GooglePlay} alt='icon' />
                        Google Play
                        </button>
                </section>
                <section className={classes.sec2}>
                    <img src={mobiles} alt={mobiles} className={classes.mobi} />
                </section>
            </main>
        </div>
    )
}
export default HomePage;