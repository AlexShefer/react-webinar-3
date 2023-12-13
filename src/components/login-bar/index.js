import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginBar(props) {
	const cn = bem('LoginBar');

	return (
		<div className={cn()}>
			{props.user && (
				<Link className={cn('link')} to={props.link}>
					{props.user}
				</Link>
			)}
			<button onClick={props.action}>
				{props.user ? 'Выход' : 'Вход'}
			</button>
		</div>
	);
}

export default LoginBar;
