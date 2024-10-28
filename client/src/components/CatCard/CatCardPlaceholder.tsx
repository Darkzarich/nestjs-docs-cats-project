import './CatCard.css';

type Props = {
  children: React.ReactNode;
};

function CatCardPlaceholder({ children }: Props) {
  return <div className="cat">{children}</div>;
}

export default CatCardPlaceholder;
