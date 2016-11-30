/**
 * Created by Jules on 08/06/2016.
 */
var binaryCourseStatus = 0;

while(binaryCourseStatus.length != 6){
    binaryCourseStatus = '0' + binaryCourseStatus;
}

var idxCourse = 0;
console.log(binaryCourseStatus);
binaryCourseStatus = binaryCourseStatus.split('').reverse().join('');
console.log(binaryCourseStatus);
binaryCourseStatus = binaryCourseStatus.substr(0, idxCourse) + '1' + binaryCourseStatus.substr(idxCourse+1);
console.log(binaryCourseStatus);

binaryCourseStatus = binaryCourseStatus.split('').reverse().join('');
console.log(binaryCourseStatus);

console.log(parseInt(binaryCourseStatus, 2));