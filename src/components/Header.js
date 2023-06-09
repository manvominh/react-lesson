import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/shop_context";

const Header = () => {
    const [displayusername, displayusernameupdate] = useState('');    
    const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        sessionStorage.clear();
    }
    
    const getNumberOfSelectedProducts = () => {
        let numberOfSelectedProducts = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            
            numberOfSelectedProducts++;
          }
        }
        return numberOfSelectedProducts;
      };
    let menu;
    let username = sessionStorage.getItem('username');
    //console.log(username);
    if (username === '' || username === null) {        
         menu = (
            <>
            <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>                        
            <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
            </>
        ) 
    }
    else {
        menu = (
            <>
            <li className="nav-item"><Link to="/profile" className="nav-link">Profile</Link></li>  
            <li className="nav-item"><Link to="/login" className="nav-link" onClick={logout}>Logout</Link></li>                                    
            </>
        ) 
    }
    useEffect(() => {

        if (location.pathname === '/login' || location.pathname === '/register') {            
            displayusernameupdate('to our vegefoods website.');    
        }
        else {            
            
            if (username === '' || username === null) {
                if(location.pathname !== '/'  && location.pathname !== '/shop' && location.pathname !== '/cart'
                && location.pathname !== '/contact' && location.pathname !== '/about')
                {
                    navigate('/login');
                }                                 
            }
            else {
                displayusernameupdate(username);                
            }
            
        }
    }, [location])

    return (        
        <>
        <div className="py-1 bg-primary">
            <div className="container">
                <div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
                    <div className="col-lg-12 d-block">
                        <div className="row d-flex">
                            <div className="col-md pr-4 d-flex topper align-items-center">
                                <div className="icon mr-2 d-flex justify-content-center align-items-center"><span className="icon-phone2"></span></div>
                                <span className="text">+ 1235 2355 98</span>
                            </div>
                            <div className="col-md pr-4 d-flex topper align-items-center">
                                <div className="icon mr-2 d-flex justify-content-center align-items-center"><span className="icon-paper-plane"></span></div>
                                <span className="text">Welcome {username === '' || username === null ? 'to our vegefoods website.' : username}</span>
                            </div>
                            <div className="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
                                <span className="text">3-5 Business days delivery &amp; Free Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
            <div className="container">
                <a className="navbar-brand" href="/">Vegefoods</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="oi oi-menu"></span> Menu
                </button>

                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Home</Link>  
                        </li>
                        <li className="nav-item active">
                            <Link to="/shop" className="nav-link">Shop</Link>  
                        </li>                        
                        <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>                        
                        <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
                        {menu}
                        <li className="nav-item cta cta-colored"><Link to="/cart" className="nav-link"><span className="icon-shopping_cart"></span>[{getNumberOfSelectedProducts()}]</Link></li>

                    </ul>
                </div>
            </div>
        </nav>
        <div className="hero-wrap hero-bread" style={{backgroundImage:'url(images/bg_1.jpg)'}}>
            <div className="container">
                <div className="row no-gutters slider-text align-items-center justify-content-center">
                <div className="col-md-9 ftco-animate text-center">
                    <p className="breadcrumbs"><span className="mr-2"><Link to="/shop" className="nav-link">Shop</Link> </span> <span>Products</span></p>
                    <h1 className="mb-0 bread">Products</h1>
                </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Header;