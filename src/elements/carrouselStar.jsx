import { useQuery } from '@tanstack/react-query';
import { RiStarLine, RiStarSFill } from 'react-icons/ri';
import CarrouselGeneric from './carroselGeneric';

const CarrouselStar = ({ nameCache, variables, queryFn }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [nameCache, variables],
    queryFn,
  });

  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading</div>;

  return <CarrouselGeneric groupName={nameCache} data={data} />;
};

export default CarrouselStar;
