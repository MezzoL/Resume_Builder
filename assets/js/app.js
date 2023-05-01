// regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    PHONENO: 'phoneno',
    ANY: 'any',
}

const mainForm = document.getElementById('cv-form');
const nameDsp = document.getElementById('fullname_dsp');
const imageDsp = document.getElementById('image_dsp');
const phonenoDsp = document.getElementById('phoneno_dsp');
const emailDsp = document.getElementById('email_dsp');
const addressDsp = document.getElementById('address_dsp');
const designationDsp = document.getElementById('designation_dsp');
const summaryDsp = document.getElementById('summary_dsp');
const projectsDsp = document.getElementById('projects_dsp');
const achievementsDsp = document.getElementById('achievements_dsp');
const skillsDsp = document.getElementById('skills_dsp');
const educationsDsp = document.getElementById('educations_dsp');
const experiencesDsp = document.getElementById('experiences_dsp');

const fetchValues = (attrs, ...nodeLists) => {
    return Array.from(nodeLists[0]).map((_, i) => {
        return attrs.reduce((dataObj, attr, j) => {
            dataObj[attr] = nodeLists[j][i].value;
            return dataObj;
        }, {});
    });
}

const addErrMsg = (formElem, formElemName) => {
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
};

const removeErrMsg = (formElem) => {
    formElem.nextElementSibling.innerHTML = "";
};

const validateFormData = (elem, elemType, elemName) => {
    const invalid = () => addErrMsg(elem, elemName);
    const valid = () => removeErrMsg(elem);

    const value = elem.value.trim();
    const isInvalid = (regex) => !regex.test(value) || value.length === 0;

    switch (elemType) {
        case validType.TEXT:
            isInvalid(strRegex) ? invalid() : valid();
            break;
        case validType.TEXT_EMP:
            isInvalid(strRegex) && value.length > 0 ? invalid() : valid();
            break;
        case validType.EMAIL:
            isInvalid(emailRegex) ? invalid() : valid();
            break;
        case validType.PHONENO:
            isInvalid(phoneRegex) ? invalid() : valid();
            break;
        case validType.ANY:
            value.length === 0 ? invalid() : valid();
            break;
        default:
            break;
    }
};

const getUserInputs = () => {

    // achievements 
    let achievementsTitleElem = document.querySelectorAll('.achieve_title'),
        achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

    // experiences
    let expTitleElem = document.querySelectorAll('.exp_title'),
        expOrganizationElem = document.querySelectorAll('.exp_organization'),
        expLocationElem = document.querySelectorAll('.exp_location'),
        expStartDateElem = document.querySelectorAll('.exp_start_date'),
        expEndDateElem = document.querySelectorAll('.exp_end_date'),
        expDescriptionElem = document.querySelectorAll('.exp_description');

    // education
    let eduSchoolElem = document.querySelectorAll('.edu_school'),
        eduDegreeElem = document.querySelectorAll('.edu_degree'),
        eduCityElem = document.querySelectorAll('.edu_city'),
        eduStartDateElem = document.querySelectorAll('.edu_start_date'),
        eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
        eduDescriptionElem = document.querySelectorAll('.edu_description');

    let projTitleElem = document.querySelectorAll('.proj_title'),
        projLinkElem = document.querySelectorAll('.proj_link'),
        projDescriptionElem = document.querySelectorAll('.proj_description');

    let skillElem = document.querySelectorAll('.skill');

    // create event listeners for form validation
    const createValidationListeners = (elementList, elemType, elemName) => {
        elementList.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, elemType, elemName)));
    }

    createValidationListeners([firstnameElem], validType.TEXT, 'First Name');
    createValidationListeners([middlenameElem], validType.TEXT_EMP, 'Middle Name');
    createValidationListeners([lastnameElem], validType.TEXT, 'Last Name');
    createValidationListeners([phonenoElem], validType.PHONENO, 'Phone Number');
    createValidationListeners([emailElem], validType.EMAIL, 'Email');
    createValidationListeners([addressElem, ...achievementsTitleElem, ...achievementsDescriptionElem, ...expTitleElem, ...expOrganizationElem, ...expLocationElem, ...expStartDateElem, ...expEndDateElem, ...expDescriptionElem, ...eduSchoolElem, ...eduDegreeElem, ...eduCityElem, ...eduStartDateElem, ...eduGraduationDateElem, ...eduDescriptionElem, ...projTitleElem, ...projLinkElem, ...projDescriptionElem, ...skillElem], validType.ANY);

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    }
};
