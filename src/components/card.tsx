import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";


const Card: React.FC = () => {
	
	// Memoize stripe
	const publishableKey =
        'pk_test_l0SiFLUjXpWFAsi0HloEco9b';
	
	const stripe = useMemo(() => loadStripe(publishableKey), [publishableKey]);
	
	
	// Return JSX
	return (
		<Elements stripe={stripe}>
			<CardElement />
		</Elements>
	);
};

export default Card;
