import React, { Component, Fragment } from 'react';
import CartList from '../../components/cart-list';
import axios from 'axios';
import { connect } from 'react-redux';
import { unSetUser } from '../../store/action-creators';

class ProductCart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userId: ''
         }
    }

    tokenCheck = async () => {
        try {
            const user = await axios.get('http://localhost:5000/user');
            console.log(user);

            this.setState({
                userId: user.data.id
            })
        } catch (err) {
            throw err;
        }
    }

    async componentDidMount() {
        try {
            await this.tokenCheck();
            const { userId } = this.state;
            const cart = await axios.get(`http://localhost:5000/cart/${userId}`)
            console.log(cart);

            this.setState({
                products: cart.data
            })

        } catch (err) {
            throw err
        }
    }

    deleteProduct = async (productId) => {
        try {
            await this.tokenCheck();
            await axios.delete(`http://localhost:5000/cart/${productId}`);
            const { userId } = this.state;

            const cart = await axios.get(`http://localhost:5000/cart/${userId}`);

            this.setState({
                products: cart.data
            })

            this.props.history.push('/cart')

        } catch (err) {
            throw err
        }
    }

    render() { 
        const { products } = this.state;
        
        return ( 
            <Fragment>
                {
                    products && (
                        <CartList products={products} deleteProduct={this.deleteProduct} />
                    )
                }
            </Fragment>
         );
    }
}
 
export default connect(null, { unSetUser })(ProductCart);