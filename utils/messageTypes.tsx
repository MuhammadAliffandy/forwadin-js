export interface IAudioMessage {

    /** AudioMessage url */
    url?: (string | null);

    /** AudioMessage mimetype */
    mimetype?: (string | null);

    /** AudioMessage fileSha256 */
    fileSha256?: (Uint8Array | null);

    /** AudioMessage fileLength */
    fileLength?: (number | null);

    /** AudioMessage seconds */
    seconds?: (number | null);

    /** AudioMessage ptt */
    ptt?: (boolean | null);

    /** AudioMessage mediaKey */
    mediaKey?: (Uint8Array | null);

    /** AudioMessage fileEncSha256 */
    fileEncSha256?: (Uint8Array | null);

    /** AudioMessage directPath */
    directPath?: (string | null);

    /** AudioMessage mediaKeyTimestamp */
    mediaKeyTimestamp?: (number | null);

    /** AudioMessage contextInfo */
    contextInfo?: (any | null);

    /** AudioMessage streamingSidecar */
    streamingSidecar?: (Uint8Array | null);

    /** AudioMessage waveform */
    waveform?: (Uint8Array | null);

    /** AudioMessage backgroundArgb */
    backgroundArgb?: (number | null);

    /** AudioMessage viewOnce */
    viewOnce?: (boolean | null);
}
export interface IDocumentMessage {

    /** DocumentMessage url */
    url?: (string | null);

    /** DocumentMessage mimetype */
    mimetype?: (string | null);

    /** DocumentMessage title */
    title?: (string | null);

    /** DocumentMessage fileSha256 */
    fileSha256?: (Uint8Array | null);

    /** DocumentMessage fileLength */
    fileLength?: (number | null);

    /** DocumentMessage pageCount */
    pageCount?: (number | null);

    /** DocumentMessage mediaKey */
    mediaKey?: (Uint8Array | null);

    /** DocumentMessage fileName */
    fileName?: (string | null);

    /** DocumentMessage fileEncSha256 */
    fileEncSha256?: (Uint8Array | null);

    /** DocumentMessage directPath */
    directPath?: (string | null);

    /** DocumentMessage mediaKeyTimestamp */
    mediaKeyTimestamp?: (number | null);

    /** DocumentMessage contactVcard */
    contactVcard?: (boolean | null);

    /** DocumentMessage thumbnailDirectPath */
    thumbnailDirectPath?: (string | null);

    /** DocumentMessage thumbnailSha256 */
    thumbnailSha256?: (Uint8Array | null);

    /** DocumentMessage thumbnailEncSha256 */
    thumbnailEncSha256?: (Uint8Array | null);

    /** DocumentMessage jpegThumbnail */
    jpegThumbnail?: (Uint8Array | null);

    /** DocumentMessage contextInfo */
    contextInfo?: (any | null);

    /** DocumentMessage thumbnailHeight */
    thumbnailHeight?: (number | null);

    /** DocumentMessage thumbnailWidth */
    thumbnailWidth?: (number | null);

    /** DocumentMessage caption */
    caption?: (string | null);
}
export interface Conversation {
    conversation: string | null
}
export interface IExtendedTextMessage {

    /** ExtendedTextMessage text */
    text?: (string | null);

    /** ExtendedTextMessage matchedText */
    matchedText?: (string | null);

    /** ExtendedTextMessage canonicalUrl */
    canonicalUrl?: (string | null);

    /** ExtendedTextMessage description */
    description?: (string | null);

    /** ExtendedTextMessage title */
    title?: (string | null);

    /** ExtendedTextMessage textArgb */
    textArgb?: (number | null);

    /** ExtendedTextMessage backgroundArgb */
    backgroundArgb?: (number | null);

    /** ExtendedTextMessage font */
    font?: (string | null);

    /** ExtendedTextMessage previewType */
    previewType?: (any | null);

    /** ExtendedTextMessage jpegThumbnail */
    jpegThumbnail?: (Uint8Array | null);

    /** ExtendedTextMessage contextInfo */
    contextInfo?: (any | null);

    /** ExtendedTextMessage doNotPlayInline */
    doNotPlayInline?: (boolean | null);

    /** ExtendedTextMessage thumbnailDirectPath */
    thumbnailDirectPath?: (string | null);

    /** ExtendedTextMessage thumbnailSha256 */
    thumbnailSha256?: (Uint8Array | null);

    /** ExtendedTextMessage thumbnailEncSha256 */
    thumbnailEncSha256?: (Uint8Array | null);

    /** ExtendedTextMessage mediaKey */
    mediaKey?: (Uint8Array | null);

    /** ExtendedTextMessage mediaKeyTimestamp */
    mediaKeyTimestamp?: (number | null);

    /** ExtendedTextMessage thumbnailHeight */
    thumbnailHeight?: (number | null);

    /** ExtendedTextMessage thumbnailWidth */
    thumbnailWidth?: (number | null);

    /** ExtendedTextMessage inviteLinkGroupType */
    inviteLinkGroupType?: (any | null);

    /** ExtendedTextMessage inviteLinkParentGroupSubjectV2 */
    inviteLinkParentGroupSubjectV2?: (string | null);

    /** ExtendedTextMessage inviteLinkParentGroupThumbnailV2 */
    inviteLinkParentGroupThumbnailV2?: (Uint8Array | null);

    /** ExtendedTextMessage inviteLinkGroupTypeV2 */
    inviteLinkGroupTypeV2?: (any | null);

    /** ExtendedTextMessage viewOnce */
    viewOnce?: (boolean | null);
}