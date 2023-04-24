import { useContext } from 'react';

import CarrouselStar from '../elements/carrouselStar';
import BaseSortDropdown from '../elements/baseSortDropdown';
import { getLanguage, getStarred } from '../api';
import { isValid } from '../tools/managerUser';
import Menu from '../elements/menu';
import usePersistedState from '../tools/usePersistedState';
import CarrouselGeneric from '../elements/carroselGeneric';
import { StorageBookingContext } from '../contexts/storageBooking';

const Discovery = () => {
  isValid();
  const [useLanguages, setLanguages] = usePersistedState('languages', {
    Vue: { active: true, sort: 'stars' },
    Typescript: { active: false, sort: 'stars' },
    Javascript: { active: false, sort: 'stars' },
    Go: { active: true, sort: 'stars' },
    CSS: { active: false, sort: 'stars' },
    Node: { active: false, sort: 'stars' },
  });
  const [bookmarkedRepos] = useContext(StorageBookingContext);

  return (
    <div className="w-[100%] min-h-[100rem]">
      <Menu />

      <div
        className="
      pl-[4rem] pt-[2rem]"
      >
        <h3>My Bookmarks</h3>
        <CarrouselGeneric groupName="bookmarks" data={bookmarkedRepos} />
      </div>
      <div className="pl-[4rem] pt-[2rem]">
        <h4>Toggle topics to show</h4>
        <div className=" flex gap-[0.5rem]">
          {Object.keys(useLanguages).map((item) => (
            <button
              data-test={`btn-${item}`}
              onClick={() => {
                setLanguages((prevState) => ({
                  ...prevState,
                  [item]: {
                    ...useLanguages[item],
                    active: !useLanguages[item].active,
                  },
                }));
              }}
              key={item}
              type="button"
              className={`!text-[black] text-[1.2rem] !font-bold !border-2 !border-[black] !rounded-full px-[2rem] py-[0.5rem] ${
                useLanguages[item].active === true
                  ? 'bg-[#D4D4D4]'
                  : 'bg-[transparent]  '
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div>
          {Object.keys(useLanguages).map(
            (item) =>
              useLanguages[item].active && (
                <div key={item}>
                  <div className=" flex gap-[1rem]  items-center">
                    <h3>Top {item} </h3>
                    <BaseSortDropdown
                      passvalue={(e) =>
                        setLanguages((prevState) => ({
                          ...prevState,
                          [item]: { ...useLanguages[item], sort: e },
                        }))
                      }
                    />
                  </div>
                  <CarrouselStar
                    nameCache={item}
                    queryFn={getLanguage}
                    variables={{
                      sort: useLanguages[item].sort,
                      language: item,
                    }}
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Discovery;
