
import { Modal } from 'antd';

interface IModalProps {
    visible?: boolean;
    onOk: () => void;
    onCancel: () => void;
    title?: string | undefined;
    children: React.ReactNode;
}

const UMModal = ({ visible, onOk, onCancel, title, children }: IModalProps) => {
    return (
        <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
            {children}
        </Modal>
    );
};

export default UMModal;
