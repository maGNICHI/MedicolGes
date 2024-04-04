import { Avatar } from "@chakra-ui/avatar";
import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.username}
        src={user.pic}
      />
      {user.username}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
/**
 import { Avatar } from "@chakra-ui/avatar";
import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
    
       <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.username}
        src={user.pic}
      />
      {user.username}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;

 */
