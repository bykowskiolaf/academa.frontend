import { useInfiniteCourses } from '@/hooks/useCourses/useInfiniteCourses';
import { Link } from '@tanstack/react-router';
import { useVirtualizer } from '@tanstack/react-virtual';
import { LoaderIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import logoUrl from '/logo.svg?url';

const CoursesPage = () => {
  const pageSize = 10;
  const {
    data,
    error: coursesError,
    isLoading: coursesIsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useInfiniteCourses({ pageSize });

  // Flatten all pages into one array
  const allCourses = data ? data.pages.flatMap(page => page.content) : [];

  // Grid configuration
  const columns = 3;
  const totalRows = Math.ceil(allCourses.length / columns);

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? totalRows + 1 : totalRows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5
  });

  // Fetch more courses when scrolling to bottom
  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
    if (!lastItem) return;

    if (
      lastItem.index >= totalRows - 1 &&
      hasNextPage &&
      !isFetchingNextPage &&
      !coursesIsLoading
    ) {
      fetchNextPage();
    }
  }, [
    rowVirtualizer.getVirtualItems(),
    totalRows,
    hasNextPage,
    isFetchingNextPage,
    coursesIsLoading,
    fetchNextPage
  ]);

  if (coursesError) {
    return (
      <div className="p-4 bg-background text-foreground">
        <h1 className="text-2xl font-bold dela-gothic">Courses</h1>
        <p>Error loading courses: {coursesError.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-h-[85vh] overflow-auto p-4 text-foreground">
      <h1 className="text-2xl font-bold mb-4 dela-gothic">Courses</h1>
      <p className="mb-4">Browse through our list of courses.</p>

      <div ref={parentRef} className="w-full">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative'
          }}>
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const isLoaderRow = virtualRow.index > totalRows - 1;
            const startIndex = virtualRow.index * columns;
            const rowCourses = allCourses.slice(
              startIndex,
              startIndex + columns
            );

            return (
              <div
                key={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`
                }}>
                {isLoaderRow ? (
                  <div className="flex items-center justify-center h-full">
                    {(isFetchingNextPage || coursesIsLoading) && (
                      <LoaderIcon className="animate-spin" />
                    )}
                    {!coursesIsLoading &&
                      !isFetchingNextPage &&
                      !hasNextPage && <p>Thats all of 'em!</p>}
                  </div>
                ) : (
                  <div
                    className={`grid grid-cols-${columns} gap-4 h-full px-2 py-2 box-border`}>
                    {rowCourses.map(course => (
                      <CourseCard key={course.uuid} course={course} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center my-4">
        {coursesIsLoading && <LoaderIcon className="animate-spin" />}
      </div>
    </div>
  );
};

const CourseCard = ({ course }: { course: Course }) => {
  if (!course) return null;

  return (
    <Link to={`/courses/${course.uuid}`}>
      <div
        className="relative h-full rounded-lg overflow-hidden shadow-md bg-card text-card-foreground"
        style={
          course.picture
            ? {
                backgroundImage: `url(${course.picture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
            : {
                backgroundImage: `url(${logoUrl})`,
                backgroundSize: 'calc(100% - 4rem) calc(100% - 4rem)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }
        }>
        {/* Overlay */}
        <div className="absolute inset-0 bg-transparent/10 flex flex-col justify-end p-4">
          <h3 className="mb-1 px-2 rounded w-fit font-bold text-lg bg-background dela-gothic">
            {course.name}
          </h3>
          <p className="px-2 rounded w-fit text-ellipsis text-nowrap max-w-full overflow-x-clip text-sm bg-background">
            {course.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CoursesPage;
