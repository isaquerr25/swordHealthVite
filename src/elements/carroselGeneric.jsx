import { useQuery } from '@tanstack/react-query';
import { useContext, useRef } from 'react';
import { RiStarLine, RiStarSFill } from 'react-icons/ri';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';
import { StorageBookingContext } from '../contexts/storageBooking';

function navigate(ref, direction = 'left') {
  if (!ref || !ref.current) return;

  const scrollContainer = ref.current;
  const anyChild = scrollContainer.querySelector('.carrousel-item');

  const currentScrollLeft = scrollContainer.scrollLeft;
  const childrenWidth = anyChild.offsetWidth;

  scrollContainer.scroll({
    left:
      currentScrollLeft +
      (direction == 'left' ? -childrenWidth : childrenWidth),
    behavior: 'smooth',
  });
}

const CarrouselGeneric = ({ groupName, data }) => {
  const groupRef = useRef();
  const [bookmarkedRepos, setBookmarkedRepos] = useContext(
    StorageBookingContext
  );

  const navButtonHeight = groupName == 'bookmarks' ? '10rem' : '14rem';

  return (
    <div className="relative">
      <button
        className={`absolute top-[50%] translate-y-[-50%] left-0 z-10 h-[${navButtonHeight}] w-16 bg-black text-white flex justify-center items-center opacity-10 hover:opacity-50 transition duration-300`}
        type="button"
        onClick={() => navigate(groupRef, 'left')}
      >
        <AiOutlineCaretLeft size={25} />
      </button>
      <button
        className={`absolute top-[50%] translate-y-[-50%]  right-0 z-10  h-[${navButtonHeight}] w-16 bg-black text-white flex justify-center items-center opacity-10 hover:opacity-50 transition duration-300`}
        type="button"
        onClick={() => navigate(groupRef, 'right')}
      >
        <AiOutlineCaretRight size={25} />
      </button>

      <div
        className=" w-[100%] flex overflow-x-scroll py-[1rem] px-[1rem]  gap-[1rem] touch snap-x snap-mandatory"
        data-test={`carrosel-${groupName}`}
        ref={groupRef}
      >
        {data.map((item, index) => {
          const star = bookmarkedRepos
            .map((repo) => repo.node_id)
            .includes(item.node_id);
          return (
            <a
              href={item.html_url}
              target="_blank"
              data-test={`carrosel-item-${groupName}-${index}`}
              style={{
                backgroundImage: `url(https://opengraph.githubassets.com/${item.node_id}/${item.owner.login}/${item.name})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              key={item.node_id}
              className={`carrousel-item snap-start scroll-touch  item flex flex-shrink-0   justify-end items-start ${
                groupName == 'bookmarks'
                  ? ' w-[17.5rem] h-[10rem]  '
                  : ' w-[24.5rem] h-[14rem]  '
              } p-[0.5rem] zoom`}
            >
              {star ? (
                <RiStarSFill
                  size={22}
                  onClick={(e) => {
                    e.preventDefault();
                    setBookmarkedRepos((repos) =>
                      repos.filter((r) => r.node_id !== item.node_id)
                    );
                  }}
                />
              ) : (
                <RiStarLine
                  size={22}
                  onClick={(e) => {
                    e.preventDefault();
                    setBookmarkedRepos((repos) => [...repos, item]);
                  }}
                />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default CarrouselGeneric;
