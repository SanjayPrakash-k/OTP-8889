/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
/*************************************************************************************
 ***********
 *
 *
 * ${OTP-8889} : ${Identify change in Address}
 *
 *
 **************************************************************************************
 ********
 *
 * Author: Jobin and Jismi IT Services
 *
 * Date Created : 27-May-2025
 *
 * Description : This script is for updating the created custom checkbox. Whenever there is a change in exiting address 
 * or new address is added to the Customer Record, the custom field should be checked. This should work only in Edit context.
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0  :  27-May-2025:  The initial build was created by JJ0404
 *
 *
 *
 *************************************************************************************
 **********/
define(['N/log', 'N/record'],
/**
 * @param{log} log
 */
function(log, record) {
    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */

    var isAddressChanged = false;
    let recordMode = '';

    
    function pageInit(scriptContext) {
        findMode(scriptContext)
    }


    function fieldChanged(scriptContext) {
        handleAddressUpdate(scriptContext);
    }

    /**
    * Function to find current mode. Whether the record is in create mode or edit mode.
    * @param scriptContext
    */
    function findMode(scriptContext){
        recordMode = scriptContext.mode;
    }

    /**
    * Function to update the custom checkbox based on the changes in the address or other fields
    * @param scriptContext
    */
    function handleAddressUpdate(scriptContext){
        try{
            console.log('Mode', recordMode);
            if(recordMode === 'edit'){
                if(scriptContext.fieldId == 'defaultaddress'){
                    scriptContext.currentRecord.setValue({
                        fieldId: 'custentity_jj_address_change_indicator',
                        value: true,
                        ignoreFieldChange: true
                    });
                    isAddressChanged = true;
                    console.log('Flag value changed', isAddressChanged);

                } else {
                    if(isAddressChanged === true) {
                        scriptContext.currentRecord.setValue({
                            fieldId: 'custentity_jj_address_change_indicator',
                            value: true,
                            ignoreFieldChange: true
                        });

                    } if(isAddressChanged === false) {
                        scriptContext.currentRecord.setValue({
                            fieldId: 'custentity_jj_address_change_indicator',
                            value: false,
                            ignoreFieldChange: true
                        });
                    }
                }
            }
        } catch(error) {
            log.error('Unexpected error occured', error.toString());
        }
    }
    
    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    };
    
});
