-- Seed data for Creston Community High School Class of 1970
-- These are placeholder names - replace with actual class roster

INSERT INTO classmates (first_name, last_name, status, bio) VALUES
('Robert', 'Anderson', 'alive', 'Class president, played varsity football all four years.'),
('Patricia', 'Baker', 'alive', 'Yearbook editor, National Honor Society member.'),
('James', 'Carter', 'deceased', 'Star quarterback, went on to serve in the military.'),
('Linda', 'Davis', 'alive', 'Cheerleading captain, drama club lead actress.'),
('Michael', 'Edwards', 'alive', 'Track and field champion, science fair winner.'),
('Barbara', 'Foster', 'deceased', 'Class treasurer, beloved by all for her kindness.'),
('William', 'Garcia', 'alive', 'Band director''s assistant, played trumpet in the marching band.'),
('Susan', 'Harris', 'alive', 'Homecoming queen, active in student government.'),
('Richard', 'Johnson', 'deceased', 'Wrestling team captain, known for his infectious laugh.'),
('Karen', 'Miller', 'alive', 'Art club president, designed the class ring.'),
('Thomas', 'Nelson', 'alive', 'Debate team star, future lawyer.'),
('Nancy', 'Owens', 'alive', 'Library aide, voracious reader, poetry contest winner.'),
('Charles', 'Peterson', 'deceased', 'Shop class whiz, built the set for the spring musical.'),
('Betty', 'Quinn', 'alive', 'Future teacher, always helping classmates with homework.'),
('Joseph', 'Reed', 'alive', 'Baseball team pitcher, also played basketball.'),
('Dorothy', 'Smith', 'alive', 'Choir soloist, performed at graduation ceremony.'),
('Donald', 'Taylor', 'deceased', 'Football lineman, gentle giant of the class.'),
('Margaret', 'Underwood', 'alive', 'French club president, exchange program participant.'),
('Paul', 'Vance', 'alive', 'Newspaper editor, broke several school stories.'),
('Sandra', 'Wilson', 'alive', 'Dance team captain, choreographed the senior prom dance.');

INSERT INTO memorials (classmate_id, memorial_text, date_of_passing) VALUES
(3, 'James served his country with honor after graduation. He was remembered fondly at the 25th reunion.', '2015-06-12'),
(6, 'Barbara''s warmth and generosity touched everyone she met. Her family remains part of the Creston community.', '2018-03-22'),
(9, 'Richard never lost his Panther pride. His laughter still echoes in the memories of his classmates.', '2020-11-05'),
(13, 'Charles was a craftsman in every sense. The sets he built are still remembered by those who saw the musical.', '2019-08-17'),
(17, 'Donald was the heart of the football team. His teammates still gather each year to honor his memory.', '2022-01-30');

INSERT INTO gallery_metadata (title, caption, category, date_taken, r2_object_key, thumbnail_r2_key, tags) VALUES
('Senior Class Photo', 'The complete Class of 1970 on the front steps of CCHS.', 'Candid', '1970-05-01', 'yearbook/senior-class-1970.jpg', 'yearbook/senior-class-1970-thumb.jpg', 'class photo, seniors, group'),
('Science Lab', 'Students conducting experiments in the chemistry lab.', 'Academics', '1969-10-15', 'yearbook/science-lab.jpg', 'yearbook/science-lab-thumb.jpg', 'science, chemistry, lab'),
('Football Team', 'The 1969 Creston Panthers football team in full uniform.', 'Sports', '1969-09-01', 'yearbook/football-team.jpg', 'yearbook/football-team-thumb.jpg', 'football, sports, team'),
('Basketball Action', 'Panthers taking the court during the regional championship.', 'Sports', '1970-02-14', 'yearbook/basketball-action.jpg', 'yearbook/basketball-action-thumb.jpg', 'basketball, sports, action'),
('Library Study Group', 'Students gathered in the library for exam preparation.', 'Academics', '1970-03-20', 'yearbook/library-study.jpg', 'yearbook/library-study-thumb.jpg', 'library, study, academics'),
('Spring Musical Cast', 'The cast of the 1970 spring musical production.', 'Candid', '1970-05-15', 'yearbook/spring-musical.jpg', 'yearbook/spring-musical-thumb.jpg', 'drama, musical, theater'),
('Marching Band', 'The CCHS marching band at the homecoming parade.', 'Sports', '1969-10-09', 'yearbook/marching-band.jpg', 'yearbook/marching-band-thumb.jpg', 'band, music, parade'),
('Art Class Display', 'Student artwork displayed in the school hallway.', 'Academics', '1970-04-01', 'yearbook/art-class.jpg', 'yearbook/art-class-thumb.jpg', 'art, creativity, display'),
('Graduation Ceremony', 'The moment of truth — receiving diplomas at graduation.', 'Candid', '1970-05-31', 'yearbook/graduation.jpg', 'yearbook/graduation-thumb.jpg', 'graduation, ceremony, diplomas'),
('Homecoming Court', 'The 1969 Homecoming Court on the football field.', 'Sports', '1969-10-09', 'yearbook/homecoming-court.jpg', 'yearbook/homecoming-court-thumb.jpg', 'homecoming, court, football'),
('Newspaper Clipping - School Building', 'Creston News Advertiser article about the new school wing.', 'Newspaper', '1970-01-20', 'clippings/school-wing-article.jpg', 'clippings/school-wing-article-thumb.jpg', 'newspaper, school, construction'),
('Newspaper Clipping - Sports', 'Panthers win regional basketball championship coverage.', 'Newspaper', '1970-02-20', 'clippings/basketball-championship.jpg', 'clippings/basketball-championship-thumb.jpg', 'newspaper, basketball, championship'),
('Candid - Locker Hallway', 'Students chatting between classes in the main hallway.', 'Candid', '1969-11-10', 'yearbook/locker-hallway.jpg', 'yearbook/locker-hallway-thumb.jpg', 'hallway, candid, students'),
('Cafeteria Lunch', 'The bustling school cafeteria during lunch period.', 'Candid', '1970-03-05', 'yearbook/cafeteria.jpg', 'yearbook/cafeteria-thumb.jpg', 'cafeteria, lunch, candid'),
('Track Meet', 'Panthers competing at the Union County track meet.', 'Sports', '1970-04-25', 'yearbook/track-meet.jpg', 'yearbook/track-meet-thumb.jpg', 'track, sports, competition');

INSERT INTO timeline_events (title, description, event_date, category) VALUES
('Irving/Maple School Building Demolished', 'The old Irving/Maple Street school building, which had served Creston students for decades, was demolished to make way for modern educational facilities.', '1970-01-15', 'School'),
('Creston Panthers Basketball Season Opens', 'The Creston Community High School Panthers opened their 1970 basketball season with high hopes and a roster full of talented seniors.', '1970-01-20', 'Sports'),
('Apollo 13 Crisis Captivates Nation', 'The Apollo 13 mission crisis captivated the nation. Creston families gathered around their televisions to watch the dramatic rescue unfold.', '1970-04-13', 'National'),
('First Earth Day Observed', 'The first Earth Day was celebrated nationwide on April 22, 1970. Creston students participated in local environmental awareness activities.', '1970-04-22', 'Community'),
('Creston News Advertiser Expands Coverage', 'The local newspaper expanded its coverage of high school sports and activities, giving the Class of 1970 more visibility in the community.', '1970-05-01', 'Community'),
('Spring Musical Production', 'The CCHS drama department presented their spring musical, featuring several Class of 1970 students in leading roles.', '1970-05-15', 'School'),
('Prom Night at the National Guard Armory', 'The Class of 1970 held their senior prom at the Creston National Guard Armory, decorated with a "Groovy 70s" theme.', '1970-05-22', 'School'),
('Graduation Ceremony', 'The Creston Community High School Class of 1970 held their commencement ceremony, marking the end of an era and the beginning of new journeys.', '1970-05-31', 'School'),
('New Creston Public Library Wing Opens', 'The Gibson Memorial Library opened a new wing, expanding resources for Creston residents and students.', '1970-09-01', 'Civic'),
('Homecoming Game & Parade', 'The annual Creston Panthers Homecoming celebration featured a parade down Main Street and a memorable football game.', '1970-10-09', 'Sports');
